import { accessLevel, TeamMember } from "../domain/TeamMemberInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { REFRESH_TOKEM_MAX_AGE } from "../infrasctructure/constants/jwt";
import GenerateOtp from "../infrasctructure/services/generateOtp";
import Jwt from "../infrasctructure/services/jwt";
import sendEmail from "../infrasctructure/services/sendEmail";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import OtpUseCase from "../use_case/otpUsecase";
import TeamMemberUsecase from "../use_case/teamMemberUsecase";


export default class TeamMemberController {
    constructor(
        private teammemberUsecase: TeamMemberUsecase,
        private otpusecase: OtpUseCase,
        private sendmails: sendEmail,
        private jwt: Jwt,
        private generateOtp: GenerateOtp
    ) { }




    async MemberSignup(req: Req, res: Res, next: Next) {
        try {
            const { name, email, password, username } = req.body
            console.log(password);

            // check if email exist 
            const emailExist = await this.teammemberUsecase.checkIfEmailExist(email);
            if (!emailExist?.email) {
                // generate otp 
                const otp = await this.generateOtp.generateOtp()
                //send otp to mail 
                await this.sendmails.sendOtpMail(email, name, otp)
                //save otp in database
                await this.otpusecase.saveotp({ otp, email, password, username })
                res.status(httpStatus.OK).json({ message: 'otp have sented to email' })
            } else {
                res.status(httpStatus.CONFLICT).json('email is already in use . try different email ')
            }

        } catch (error) {
            next(error)
        }
    }



    async verifyOtpAndSaveMember(req: Req, res: Res, next: Next): Promise<void> {

        try {
            const { otp, email, role, name } = req.body

            console.log(otp, email, role, name);

            // check otp is correct 
            const userdata = await this.otpusecase.compareOtp(email, otp)
            console.log(userdata);
            if (userdata) {
                // saving the projectMember info on database //
                const teamMemberDetails: TeamMember = {
                    name: name,
                    email: email,
                    userName: userdata.username,
                    password: userdata.password,
                    role: role,
                    isGoogle: false,
                    permissions: {
                        board: accessLevel.view,
                        modules: accessLevel.view,
                        dbDesign: accessLevel.view
                    }
                }

                const response = await this.teammemberUsecase.saveTeamMember(teamMemberDetails)
                if (response) {
                    res.status(httpStatus.OK).json('team member saved in database')
                    this.otpusecase.removeOtp(email)
                } else {
                    res.status(httpStatus.CONFLICT).json('failed to save member in database')
                }
            }
        } catch (error) {
            next(error)
        }
    }

    async Login(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { email, password } = req.body
            // check if email matches //

            const TeamMemberData = await this.teammemberUsecase.checkIfEmailExist(email)
            if (TeamMemberData?.password) {
                // check password matches //
                const isPasswordCorrect = await this.teammemberUsecase.isPasswordMatching(password, TeamMemberData?.password)
                if (isPasswordCorrect && TeamMemberData.isGoogle == false) {
                    // getting teaMember data from database //

                    const teamMemberData = await this.teammemberUsecase.getTeamMemberDetails(email)
                    if (teamMemberData?._id && teamMemberData?.role) {
                        // sending jwt response 

                        const accesstoken = await this.jwt.generateAccesToken(teamMemberData._id, teamMemberData.role)
                        const refreshtoken = await this.jwt.generateRefreshToken(teamMemberData._id, teamMemberData.role)
                        const data = {
                            id: teamMemberData._id,
                            name: teamMemberData.name,
                            username: teamMemberData.userName,
                            email: teamMemberData.email,
                            role: teamMemberData.role,
                            avatar: teamMemberData.avatar,
                            permissions: teamMemberData.permissions
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
                } else if (TeamMemberData?.isGoogle == true) {
                    res.status(httpStatus.CONFLICT).json('Try a different sigIn Method')
                }
                else {
                    res.status(httpStatus.CONFLICT).json('password is incorrect')

                }
            }
            else {
                res.status(httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please check the email and try again.")

            }
        } catch (error) {
            next(error)

        }
    }


    async googleSignup(req: Req, res: Res, next: Next) {
        try {
            const { id: password, email: email, name: name, picture: avatar, role: role } = req.body
            const userName = name.split(" ").slice(0, 1).toString()
            const permissions = {
                board: accessLevel.view,
                modules: accessLevel.view,
                dbDesign: accessLevel.view
            }
            const isGoogle = true
            // check if email exist 

            const isEmailExist = await this.teammemberUsecase.checkIfEmailExist(email)

            if (!isEmailExist) {
                // create a new team member
                const userdata = await this.teammemberUsecase.saveTeamMember({ name, email, isGoogle, password, permissions, role, userName, avatar })
                if (userdata?._id && userdata.role) {

                    // sending jwt as response
                    const accesstoken = await this.jwt.generateAccesToken(userdata?._id, userdata?.role);
                    const refreshtoken = await this.jwt.generateRefreshToken(userdata?._id, userdata?.role);
                    const data = {
                        id: userdata._id,
                        name: userdata.name,
                        username: userdata.userName,
                        email: userdata.email,
                        role: userdata.role,
                        avatar: userdata.avatar,
                        permissions: userdata.permissions
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
                    res.status(httpStatus.BAD_REQUEST).json('invalid user data .  try different sigup method')

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

            const isUser = await this.teammemberUsecase.checkIfEmailExist(email)

            if (isUser?._id && isUser.isGoogle == true) {
                if (isUser._id) {


                    // sending jwt as response
                    const accesstoken = await this.jwt.generateAccesToken(isUser?._id, isUser?.role);
                    const refreshtoken = await this.jwt.generateRefreshToken(isUser?._id, isUser?.role);
                    const data = {
                        id: isUser._id,
                        name: isUser.name,
                        username: isUser.userName,
                        email: isUser.email,
                        role: isUser.role,
                        avatar: isUser.avatar,
                        permissions: isUser.permissions
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
                    res.status(httpStatus.CONFLICT).json('try different signIn method')
                }
            } else {
                res.status(httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please create a new account or try again with a different email.")

            }
        } catch (error) {
            next(error)
        }
    }


}