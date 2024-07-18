import { httpStatus } from "../infrasctructure/constants/httpStatus"
import GenerateOtp from "../infrasctructure/services/generateOtp"
import Jwt from "../infrasctructure/services/jwt"
import sendEmail from "../infrasctructure/services/sendEmail"
import { Req, Res, Next } from "../infrasctructure/types/expressTypes"
import OtpUseCase from "../use_case/otpUsecase"




export default class CommonController {
    constructor(
        private generateOtp: GenerateOtp,
        private sendemails: sendEmail,
        private otpusecase: OtpUseCase,
        private jwt: Jwt

    ) { }

    async resendOtp(req: Req, res: Res, next: Next) {
        try {
            const { email, name } = req.body
            const otp = await this.generateOtp.generateOtp()
            await this.otpusecase.resendOtp(email, otp)
            this.sendemails.sendOtpMail(email, name, otp)
            res.status(httpStatus.ACCEPTED).json('otp sented')
        } catch (error) {
            next(error)
        }
    }

    async refreshAccestoken(req: Req, res: Res, next: Next) {
        const refreshtoken = req.cookies.refreshtoken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk4YTgzZmQ1ZGMyNmRkYTFkMTk0ZGMiLCJyb2xlIjoiUHJvamVjdC1MZWFkIiwiaWF0IjoxNzIxMjk1ODI4LCJleHAiOjE3MjE5MDA2Mjh9.9EG7yIjIE4hI51P2WEGaxfJkaQelp61oc3tQ6bs3ako'
        try {
            if (refreshtoken) {
                const accestoken = this.jwt.createAccesTokenWithRefreshToken(refreshtoken)
                if (accestoken) {
                    res.status(httpStatus.OK).json({ accestoken })
                }
            } else {
                res.status(httpStatus.UNAUTHORIZED).json('UNAUTHORIZED access')
            }
        } catch (error) {
            next(error)
        }

    }


}