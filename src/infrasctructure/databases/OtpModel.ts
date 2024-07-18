import mongoose, { Schema } from "mongoose";
import { Otp } from "../../domain/OtpInterface";


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
    }
})

const OtpModel = mongoose.model<Otp | Document>('otp', otpschema)

export default OtpModel