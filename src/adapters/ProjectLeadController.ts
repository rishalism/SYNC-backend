import { ProjectLead } from "../domain/ProjectLeadInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { REFRESH_TOKEM_MAX_AGE } from "../infrasctructure/constants/jwt";
import GenerateOtp from "../infrasctructure/services/generateOtp";
import Jwt from "../infrasctructure/services/jwt";
import sendEmail from "../infrasctructure/services/sendEmail";
import { Req, Res, Next } from "../infrasctructure/types/expressTypes";
import OtpUseCase from "../use_case/otpUsecase";
import ProjectLeadUseCase from "../use_case/projectLeadUsecase";


export default class ProjectLeadController {
    constructor(
        private generateOtp: GenerateOtp,
        private projectleadusecase: ProjectLeadUseCase,
        private sendemails: sendEmail,
        private otpusecase: OtpUseCase,
        private jwt: Jwt
    ) { }


    async Signup(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { name, email, password, username } = req.body
            // check if email exits 
            const ProjectLeadExist = await this.projectleadusecase.checkEmailExist(email)

            if (!ProjectLeadExist.data) {
                // generate otp here 
                const otp = await this.generateOtp.generateOtp()
                console.log(otp, '------------------------otp----------------------------');

                // save otp in db
                await this.otpusecase.saveotp({ otp, email, password, username })
                await this.sendemails.sendOtpMail(email, name, otp)
                res.status(httpStatus.OK).json({ message: 'otp have sented to email' })
            } else {
                res.status(httpStatus.CONFLICT).json('email is already in use. try different email')
            }
        } catch (error) {
            next(error)
        }
    }



    async verifyOtpAndSaveUser(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { otp, email, role, name } = req.body
            /// cheking otp mathces //
            const userdata = await this.otpusecase.compareOtp(email, otp)

            if (userdata) {

                // saving the userinfo in database //
                const projectLeadDetails: ProjectLead = {
                    name: name,
                    email: email,
                    username: userdata.username,
                    password: userdata.password,
                    role: role
                }
                await this.projectleadusecase.saveProjectLead(projectLeadDetails)
                // after saving user detail removing otp //
                await this.otpusecase.removeOtp(email)

                res.status(httpStatus.OK).json('user created successfully')
            } else {
                res.status(httpStatus.CONFLICT).json('invalid OTP please try again')
            }
        } catch (error) {
            next(error)

        }
    }



    async Login(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { email, password } = req.body
            // check email matches //
            const ProjectLeadData = await this.projectleadusecase.checkEmailExist(email)
            if (ProjectLeadData.data?.password) {
                // check password matches //
                const isPasswordMatch = await this.projectleadusecase.IsPasswordMatching(password, ProjectLeadData?.data.password)
                if (isPasswordMatch) {

                    // getting user data from database //

                    const ProjectLeadData = await this.projectleadusecase.GetProjectLeadDetails(email);
                    if (ProjectLeadData?._id && ProjectLeadData.role) {

                        // sending back jwt token as response //

                        const accesstoken = await this.jwt.generateAccesToken(ProjectLeadData?._id, ProjectLeadData?.role);
                        const refreshtoken = await this.jwt.generateRefreshToken(ProjectLeadData?._id, ProjectLeadData?.role);
                        const data = {
                            id: ProjectLeadData._id,
                            name: ProjectLeadData.name,
                            username: ProjectLeadData.username,
                            email: ProjectLeadData.email,
                            role: ProjectLeadData.role,
                            avatar: ProjectLeadData.avatar
                        }
                        if (refreshtoken) {
                            res.cookie('refreshtoken', refreshtoken, {
                                httpOnly: true,
                                maxAge: REFRESH_TOKEM_MAX_AGE,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
                            })
                        }
                        res.status(httpStatus.OK).json({
                            accesstoken,
                            data
                        })
                    } else {
                        res.status(httpStatus.BAD_REQUEST).json('invalid user data')
                    }
                } else {
                    res.status(httpStatus.CONFLICT).json('password is incorrect')
                }
            } else {
                res.status(httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please check the email and try again.")
            }
        } catch (error) {
            next(error)
        }
    }


}