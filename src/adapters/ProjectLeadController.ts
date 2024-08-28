import { ProjectLead } from "../domain/ProjectLeadInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { OTP_TIMER, REFRESH_TOKEN_MAX_AGE } from "../infrasctructure/constants/jwt";
import GenerateLink from "../infrasctructure/services/generateLink";
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
        private jwt: Jwt,
        private generateurl: GenerateLink
    ) { }


    async Signup(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { name, email, password, username } = req.body
            // check if email exits 
            const ProjectLeadExist = await this.projectleadusecase.checkEmailExist(email)

            if (!ProjectLeadExist.data) {
                // generate otp here 
                const otp = await this.generateOtp.generateOtp()
                // save otp in db
                await this.otpusecase.saveotp({ otp, email, password, username })
                await this.sendemails.sendOtpMail(email, name, otp)

                setTimeout(async () => {
                    const data = await this.otpusecase.removeOtp(email)
                    if (data) {
                        console.log('otp expired');
                    }
                }, OTP_TIMER);

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
            const { otp, email, role, name, avatar } = req.body
            /// cheking otp mathces //
            const userdata = await this.otpusecase.compareOtp(email, otp)

            if (userdata) {
                // saving the userinfo in database //
                const projectLeadDetails: ProjectLead = {
                    name: name,
                    email: email,
                    avatar: avatar,
                    username: userdata.username,
                    password: userdata.password,
                    isGoogle: false,
                    role: role
                }
                await this.projectleadusecase.saveProjectLead(projectLeadDetails)
                // after saving user detail removing otp //
                await this.otpusecase.removeOtp(email)
                res.status(httpStatus.OK).json('user created successfully')
            } else if (userdata == false) {
                res.status(httpStatus.CONFLICT).json('OTP expired . try resending OTP')
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

                if (isPasswordMatch && ProjectLeadData.data.isGoogle == false) {

                    if (ProjectLeadData?.data._id && ProjectLeadData.data.role) {
                        // sending back jwt token as response //
                        const accesstoken = await this.jwt.generateAccesToken(ProjectLeadData?.data._id, ProjectLeadData?.data.role);
                        const refreshtoken = await this.jwt.generateRefreshToken(ProjectLeadData?.data._id, ProjectLeadData?.data.role);
                        const data = {
                            id: ProjectLeadData.data._id,
                            name: ProjectLeadData.data.name,
                            username: ProjectLeadData.data.username,
                            email: ProjectLeadData.data.email,
                            role: ProjectLeadData.data.role,
                            avatar: ProjectLeadData.data.avatar
                        }
                        if (refreshtoken) {
                            res.cookie('refreshtoken', refreshtoken, {
                                httpOnly: true,
                                maxAge: REFRESH_TOKEN_MAX_AGE,
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
                } else if (ProjectLeadData.data.isGoogle == true) {
                    res.status(httpStatus.CONFLICT).json('try different signIn method')
                }
                else {
                    res.status(httpStatus.CONFLICT).json('password is incorrect')
                }
            } else {
                res.status(httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please check the email and try again.")
            }
        } catch (error) {
            next(error)
        }
    }


    async googleSignup(req: Req, res: Res, next: Next) {
        try {
            const { id: password, email: email, name: name, picture: avatar, role: role } = req.body
            const username = name.split(" ").slice(0, 1).toString()
            const isGoogle = true
            // check if email exist 
            const isEmailExist = await this.projectleadusecase.checkEmailExist(email)
            if (!isEmailExist.data) {
                // create new user
                const userdata = await this.projectleadusecase.saveProjectLead({ name, email, username, isGoogle, password, avatar, role })

                if (userdata._id && userdata.role) {
                    // sending back jwt token as response //
                    const accesstoken = await this.jwt.generateAccesToken(userdata?._id, userdata?.role);
                    const refreshtoken = await this.jwt.generateRefreshToken(userdata?._id, userdata?.role);

                    const data = {
                        id: userdata._id,
                        name: userdata.name,
                        username: userdata.username,
                        email: userdata.email,
                        role: userdata.role,
                        avatar: userdata.avatar
                    }
                    if (refreshtoken) {
                        res.cookie('refreshtoken', refreshtoken, {
                            httpOnly: true,
                            maxAge: REFRESH_TOKEN_MAX_AGE,
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
                res.status(httpStatus.CONFLICT).json('email is already in use. try different email')

            }

        } catch (error) {
            next(error)
        }
    }


    async googleSignin(req: Req, res: Res, next: Next) {
        try {
            const { id: password, email: email, name: name, picture: avatar, role: role } = req.body
            // check if email exist 
            const isUser = await this.projectleadusecase.checkEmailExist(email)
            if (isUser.data) {
                if (isUser.data._id && isUser?.data.role) {
                    // sending back jwt token as response //
                    const accesstoken = await this.jwt.generateAccesToken(isUser?.data?._id, isUser?.data?.role);
                    const refreshtoken = await this.jwt.generateRefreshToken(isUser?.data?._id, isUser?.data?.role);
                    isUser?.data
                    const data = {
                        id: isUser?.data._id,
                        name: isUser?.data.name,
                        username: isUser?.data.username,
                        email: isUser?.data.email,
                        role: isUser?.data.role,
                        avatar: isUser?.data.avatar
                    }

                    if (refreshtoken) {
                        res.cookie('refreshtoken', refreshtoken, {
                            httpOnly: true,
                            maxAge: REFRESH_TOKEN_MAX_AGE,
                            secure: process.env.NODE_ENV !== "development",
                            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
                        })
                    }
                    res.status(httpStatus.OK).json({
                        accesstoken,
                        data
                    })
                } else {
                    res.status(httpStatus.CONFLICT).json('try different signIn method')

                }
            } else {
                res.status(httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please create a new account or try again with a different email.")
            }

        } catch (error) {
            next(error)
        }
    }



    async inviteMember(req: Req, res: Res, next: Next) {
        try {
            const { projectId, email, projectOwner } = req.body
            const url = await this.generateurl.genereteUniqueLink(projectId, projectOwner)
            await this.sendemails.sendInvitationMail(email, projectOwner, url)
            res.status(httpStatus.OK).json("Invitation sent successfully")
        } catch (error) {
            next(error)
        }
    }


    async forgotPassword(req: Req, res: Res, next: Next) {
        try {

            const { email, role } = req.body
            // check if email exist 
            const isEmailExist = await this.projectleadusecase.checkEmailExist(email)
            if (isEmailExist) {
                const otp = await this.generateOtp.generateOtp()
                await this.sendemails.sendforgotPaswordMail(email, otp, role)
                // save reset password otp 
                const saved = await this.otpusecase.SaveResetPasswordOtp(email, otp)
                if (saved) {
                    res.status(httpStatus.OK).json(otp)
                } else {
                    res.status(httpStatus.CONFLICT).json('failed to sent OTP to your email , please double check your Email')
                }
            } else {
                res.status(httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please create a new account or try again with a different email.")

            }

        } catch (error) {
            next(error)
        }
    }


    async verifyResetPassworOTP(req: Req, res: Res, next: Next) {
        try {
            const { otp, email } = req.body
            // check if otp is correct
            const isOtpMatches = await this.otpusecase.RestPassowrdcompareOtp(email, otp)
            console.log(isOtpMatches);
            if (isOtpMatches) {
                res.status(httpStatus.OK).json('otp is correct')
                await this.otpusecase.RemoveRestPassowrdOtp(email)
            } else {
                res.status(httpStatus.CONFLICT).json('invalid otp ')
            }
        } catch (error) {
            next(error)

        }
    }


    async ResetPassword(req: Req, res: Res, next: Next) {
        try {
            const { email, password } = req.body;
            // update the password
            const isPasswordUpdated = await this.projectleadusecase.UpdatePassword(email, password)
            if (isPasswordUpdated) {
                res.status(httpStatus.ACCEPTED).json('password is changed')
            } else {
                res.status(httpStatus.CONFLICT).json('failed to Reset password')
            }
        } catch (error) {
            next(error)

        }
    }


}


