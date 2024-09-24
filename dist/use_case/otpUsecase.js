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
class OtpUseCase {
    constructor(encrypt, otpRepo) {
        this.encrypt = encrypt;
        this.otpRepo = otpRepo;
    }
    saveotp(_a) {
        return __awaiter(this, arguments, void 0, function* ({ otp, email, password, username }) {
            // hash otp here
            const hashedOtp = yield this.encrypt.hashpassord(otp);
            const hashedPassword = yield this.encrypt.hashpassord(password);
            yield this.otpRepo.storeOtpInDb(hashedOtp, email, hashedPassword, username);
        });
    }
    compareOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpDAta = yield this.otpRepo.getOtp(email);
            if (!otpDAta) {
                return false;
            }
            const isvalid = yield this.encrypt.compare(otp, otpDAta === null || otpDAta === void 0 ? void 0 : otpDAta.otp);
            if (isvalid) {
                return otpDAta;
            }
            else {
                return null;
            }
        });
    }
    removeOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.otpRepo.clearOtp(email);
        });
    }
    resendOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedOtp = yield this.encrypt.hashpassord(otp);
            yield this.otpRepo.updateOtp(email, hashedOtp);
        });
    }
    SaveResetPasswordOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedotp = yield this.encrypt.hashpassord(otp);
            return yield this.otpRepo.saveResetPasswordOtp({ email, otp: hashedotp });
        });
    }
    RestPassowrdcompareOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpDAta = yield this.otpRepo.getResetPasswordOtp(email);
            if (!otpDAta) {
                return false;
            }
            const isvalid = yield this.encrypt.compare(otp, otpDAta === null || otpDAta === void 0 ? void 0 : otpDAta.otp);
            if (isvalid) {
                return otpDAta;
            }
            else {
                return null;
            }
        });
    }
    RemoveRestPassowrdOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.otpRepo.RemoveResetPasswordOtpFromDb(email);
        });
    }
}
exports.default = OtpUseCase;
