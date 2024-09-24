"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../infrasctructure/constants/httpStatus");
class CommonController {
    constructor(generateOtp, sendemails, otpusecase, jwt) {
        this.generateOtp = generateOtp;
        this.sendemails = sendemails;
        this.otpusecase = otpusecase;
        this.jwt = jwt;
    }
    resendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name } = req.body;
                const otp = yield this.generateOtp.generateOtp();
                yield this.otpusecase.resendOtp(email, otp);
                this.sendemails.sendOtpMail(email, name, otp);
                res.status(httpStatus_1.httpStatus.ACCEPTED).json('otp sented');
            }
            catch (error) {
                next(error);
            }
        });
    }
    refreshAccestoken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshtoken = req.cookies.refreshtoken;
            console.log(req.cookies, '---------------refreshtoken---------------------');
            try {
                if (refreshtoken) {
                    const accestoken = this.jwt.createAccesTokenWithRefreshToken(refreshtoken);
                    if (accestoken) {
                        res.status(httpStatus_1.httpStatus.OK).json({ accestoken });
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.UNAUTHORIZED).json('Invalid refresh token');
                    }
                }
                else {
                    console.log('in case no refreshtoken');
                    res.status(httpStatus_1.httpStatus.REQUEST_TIMEOUT).json('Refresh token not provided');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    Logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('refreshtoken', '', { expires: new Date(0), httpOnly: true, path: '/' });
                res.status(httpStatus_1.httpStatus.OK).json('logged out  succefully');
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
}
exports.default = CommonController;
