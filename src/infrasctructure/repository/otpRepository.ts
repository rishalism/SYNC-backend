
import OtpModel from "../databases/OtpModel";


export default class OtpRepository {
    constructor() {

    }

    async storeOtpInDb(otp: string, email: string, password: string, username: string) {
        await OtpModel.findOneAndUpdate(
            { email: email },
            {
                $set: { otp, password, username },
            },
            { upsert: true }
        )
    }


    async getOtp(email: string): Promise<any> {
        const UserOtp = await OtpModel.findOne({ email: email })
        return UserOtp

    }


    async clearOtp(email: string) {
      return  await OtpModel.findOneAndDelete({ email: email })
    }

    async updateOtp(email: string, otp: string) {
        await OtpModel.findOneAndUpdate({ email }, { $set: { otp: otp } }, { upsert: true })
    }

}