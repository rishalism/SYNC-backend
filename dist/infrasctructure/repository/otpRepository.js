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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OtpModel_1 = __importDefault(require("../databases/OtpModel"));
const ResetPasswordOtp_1 = __importDefault(require("../databases/ResetPasswordOtp"));
class OtpRepository {
    constructor() {
    }
    storeOtpInDb(otp, email, password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield OtpModel_1.default.findOneAndUpdate({ email: email }, {
                $set: { otp, password, username },
            }, { upsert: true });
        });
    }
    getOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserOtp = yield OtpModel_1.default.findOne({ email: email });
            return UserOtp;
        });
    }
    clearOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OtpModel_1.default.findOneAndDelete({ email: email });
        });
    }
    updateOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield OtpModel_1.default.findOneAndUpdate({ email }, { $set: { otp: otp } }, { upsert: true });
        });
    }
    saveResetPasswordOtp(otpDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const newdocument = yield new ResetPasswordOtp_1.default(otpDetails);
            return yield newdocument.save();
        });
    }
    getResetPasswordOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserOtp = yield ResetPasswordOtp_1.default.findOne({ email: email });
            return UserOtp;
        });
    }
    RemoveResetPasswordOtpFromDb(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ResetPasswordOtp_1.default.findOneAndDelete({ email: email });
        });
    }
}
exports.default = OtpRepository;
