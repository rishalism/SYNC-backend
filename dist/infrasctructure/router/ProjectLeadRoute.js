"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectLeadController_1 = __importDefault(require("../../adapters/ProjectLeadController"));
const generateOtp_1 = __importDefault(require("../services/generateOtp"));
const encryption_1 = __importDefault(require("../services/encryption"));
const otpUsecase_1 = __importDefault(require("../../use_case/otpUsecase"));
const projectLeadUsecase_1 = __importDefault(require("../../use_case/projectLeadUsecase"));
const projectLeadRespository_1 = __importDefault(require("../repository/projectLeadRespository"));
const sendEmail_1 = __importDefault(require("../services/sendEmail"));
const otpRepository_1 = __importDefault(require("../repository/otpRepository"));
const jwt_1 = __importDefault(require("../services/jwt"));
const ProjectLeadAuth_1 = __importDefault(require("../middlewares/ProjectLeadAuth"));
const generateLink_1 = __importDefault(require("../services/generateLink"));
const inviteMembersRepository_1 = __importDefault(require("../repository/inviteMembersRepository"));
// creating instances  and injecting dependencies :>
const projectLeadRepo = new projectLeadRespository_1.default();
const sendemails = new sendEmail_1.default();
const generateOtp = new generateOtp_1.default();
const encrypt = new encryption_1.default();
const otpRepo = new otpRepository_1.default();
const jwt = new jwt_1.default();
const inviteRepo = new inviteMembersRepository_1.default();
const generateurl = new generateLink_1.default(inviteRepo, encrypt);
/////////////// project-controller ///////////////////////// 
const otpusecase = new otpUsecase_1.default(encrypt, otpRepo);
const projectleadusecase = new projectLeadUsecase_1.default(projectLeadRepo, encrypt);
const projectleadcontroller = new ProjectLeadController_1.default(generateOtp, projectleadusecase, sendemails, otpusecase, jwt, generateurl);
const route = express_1.default.Router();
//auth//
route.post('/signup', (req, res, next) => projectleadcontroller.Signup(req, res, next));
route.post('/signup-verify', (req, res, next) => projectleadcontroller.verifyOtpAndSaveUser(req, res, next));
route.post('/login', (req, res, next) => projectleadcontroller.Login(req, res, next));
route.post('/auth/google-signin', (req, res, next) => projectleadcontroller.googleSignin(req, res, next));
route.post('/auth/google-signup', (req, res, next) => projectleadcontroller.googleSignup(req, res, next));
route.post('/invite-member', ProjectLeadAuth_1.default, (req, res, next) => projectleadcontroller.inviteMember(req, res, next));
route.post('/forgot-password', (req, res, next) => projectleadcontroller.forgotPassword(req, res, next));
route.post('/forgot-password/otp', (req, res, next) => projectleadcontroller.verifyResetPassworOTP(req, res, next));
route.post('/forgot/password/reset', (req, res, next) => projectleadcontroller.ResetPassword(req, res, next));
exports.default = route;
