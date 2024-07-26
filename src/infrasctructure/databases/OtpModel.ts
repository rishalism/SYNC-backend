import mongoose, { Schema } from "mongoose";
import { Otp } from "../../domain/OtpInterface";
import { OTP_TIMER } from "../constants/jwt";


const otpschema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: OTP_TIMER
    }
})

const OtpModel = mongoose.model<Otp | Document>('otp', otpschema)

export default OtpModel