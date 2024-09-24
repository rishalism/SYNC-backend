"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommonContoller_1 = __importDefault(require("../../adapters/CommonContoller"));
const generateOtp_1 = __importDefault(require("../services/generateOtp"));
const sendEmail_1 = __importDefault(require("../services/sendEmail"));
const otpUsecase_1 = __importDefault(require("../../use_case/otpUsecase"));
const otpRepository_1 = __importDefault(require("../repository/otpRepository"));
const encryption_1 = __importDefault(require("../services/encryption"));
const jwt_1 = __importDefault(require("../services/jwt"));
const route = (0, express_1.default)();
const generateotp = new generateOtp_1.default();
const sendmails = new sendEmail_1.default();
const otpRepo = new otpRepository_1.default();
const encrypt = new encryption_1.default();
const jwt = new jwt_1.default();
const optusecase = new otpUsecase_1.default(encrypt, otpRepo);
const commoncontroller = new CommonContoller_1.default(generateotp, sendmails, optusecase, jwt);
route.put('/resend', (req, res, next) => commoncontroller.resendOtp(req, res, next));
route.post('/refreshtoken', (req, res, next) => commoncontroller.refreshAccestoken(req, res, next));
// route.post('/logout', (req, res, next) => commoncontroller.Logout(req, res, next))
exports.default = route;
