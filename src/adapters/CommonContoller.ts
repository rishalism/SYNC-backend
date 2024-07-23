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
        const refreshtoken = req.cookies.refreshtoken;
        console.log(req.cookies, '---------------refreshtoken---------------------');
        try {
            if (refreshtoken) {
                const accestoken = this.jwt.createAccesTokenWithRefreshToken(refreshtoken);
                if (accestoken) {
                    res.status(httpStatus.OK).json({ accestoken });
                } else {
                    res.status(httpStatus.UNAUTHORIZED).json( 'Invalid refresh token' );
                }
            } else {
                console.log('in case no refreshtoken');
                res.status(httpStatus.REQUEST_TIMEOUT).json( 'Refresh token not provided' );
            }
        } catch (error) {
            next(error);
        }
    }





    async Logout(req: Req, res: Res, next: Next) {
        try {
            res.cookie('refreshtoken', '', { expires: new Date(0), httpOnly: true, path: '/' })
            res.status(httpStatus.OK).json('logged out  succefully')
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}