import mongoose, { Document, Model, Schema } from "mongoose";
import { ResetPasswordOtpInterface } from "../../domain/ResetPasswordOtp";



const ResetPasswordOtpSchema = new Schema<ResetPasswordOtpInterface & Document>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, { timestamps: true, expires : '3m'})


const ResetPasswordOtpModal: Model<ResetPasswordOtpInterface & Document> = mongoose.model<ResetPasswordOtpInterface & Document>('ResetPasswordOtp', ResetPasswordOtpSchema)
export default ResetPasswordOtpModal