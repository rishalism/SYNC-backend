
export default class GenerateOtp {

    async generateOtp(): Promise<string> {
        const otp = Math.floor(100000 + Math.random() * 900000)
        return otp.toString()
    }

}

