import { Otp } from "../domain/OtpInterface";
import OtpRepository from "../infrasctructure/repository/otpRepository";
import Encrypt from "../infrasctructure/services/encryption";



export default class OtpUseCase {

    constructor(
        private encrypt: Encrypt,
        private otpRepo: OtpRepository
    ) { }

    async saveotp({ otp, email, password, username }: Otp) {
        // hash otp here
        const hashedOtp = await this.encrypt.hashpassord(otp)
        const hashedPassword = await this.encrypt.hashpassord(password)
        await this.otpRepo.storeOtpInDb(hashedOtp, email, hashedPassword, username)
    }


    async compareOtp(email: string, otp: string): Promise<any> {
        const otpDAta = await this.otpRepo.getOtp(email);
        if (!otpDAta) {
            return false
        }
        const isvalid = await this.encrypt.compare(otp, otpDAta?.otp)
        if (isvalid) {
            return otpDAta
        } else {
            return null
        }
    }


    async removeOtp(email: string) {
        return await this.otpRepo.clearOtp(email)
    }

    async resendOtp(email: string, otp: string) {
        const hashedOtp = await this.encrypt.hashpassord(otp)
        await this.otpRepo.updateOtp(email, hashedOtp)
    }


    async SaveResetPasswordOtp(email: string, otp: string) {
        const hashedotp = await this.encrypt.hashpassord(otp)
        return await this.otpRepo.saveResetPasswordOtp({ email, otp: hashedotp })
    }

    async RestPassowrdcompareOtp(email: string, otp: string): Promise<any> {
        const otpDAta = await this.otpRepo.getResetPasswordOtp(email);
        if (!otpDAta) {
            return false
        }
        const isvalid = await this.encrypt.compare(otp, otpDAta?.otp)
        if (isvalid) {
            return otpDAta
        } else {
            return null
        }
    }
    async RemoveRestPassowrdOtp(email: string) {
        return await this.otpRepo.RemoveResetPasswordOtpFromDb(email)
    }

}