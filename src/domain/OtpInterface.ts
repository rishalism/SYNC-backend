import { ObjectId } from "mongoose";


export interface Otp {
    _id?: ObjectId;
    email: string;
    username : string,
    password : string;
    otp: string;

}