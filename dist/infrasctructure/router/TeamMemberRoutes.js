"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TeamMembersController_1 = __importDefault(require("../../adapters/TeamMembersController"));
const teamMemberUsecase_1 = __importDefault(require("../../use_case/teamMemberUsecase"));
const teamMemberRepository_1 = __importDefault(require("../repository/teamMemberRepository"));
const otpUsecase_1 = __importDefault(require("../../use_case/otpUsecase"));
const jwt_1 = __importDefault(require("../services/jwt"));
const sendEmail_1 = __importDefault(require("../services/sendEmail"));
const otpRepository_1 = __importDefault(require("../repository/otpRepository"));
const encryption_1 = __importDefault(require("../services/encryption"));
const generateOtp_1 = __importDefault(require("../services/generateOtp"));
const InvitationUsecase_1 = __importDefault(require("../../use_case/InvitationUsecase"));
const inviteMembersRepository_1 = __importDefault(require("../repository/inviteMembersRepository"));
const route = (0, express_1.default)();
const teammeberRepo = new teamMemberRepository_1.default();
const otpRepo = new otpRepository_1.default();
const encrypt = new encryption_1.default();
const jwt = new jwt_1.default();
const sendmails = new sendEmail_1.default();
const generateotp = new generateOtp_1.default();
const invitationRepo = new inviteMembersRepository_1.default();
const invitationUsecase = new InvitationUsecase_1.default(invitationRepo, encrypt);
const otpusecase = new otpUsecase_1.default(encrypt, otpRepo);
const teammeberusecase = new teamMemberUsecase_1.default(teammeberRepo, encrypt);
const teammembercontroller = new TeamMembersController_1.default(teammeberusecase, otpusecase, sendmails, jwt, generateotp, invitationUsecase);
// auth //
route.post('/signup', (req, res, next) => teammembercontroller.MemberSignup(req, res, next));
route.post('/signup-verify', (req, res, next) => teammembercontroller.verifyOtpAndSaveMember(req, res, next));
route.post('/login', (req, res, next) => teammembercontroller.Login(req, res, next));
route.post('/auth/google/login', (req, res, next) => teammembercontroller.googleSignin(req, res, next));
route.post('/auth/google/signup', (req, res, next) => teammembercontroller.googleSignup(req, res, next));
route.post('/accept-invitation', (req, res, next) => teammembercontroller.acceptInvitation(req, res, next));
route.post('/forgot-password', (req, res, next) => teammembercontroller.forgotPassword(req, res, next));
route.post('/forgot-password/otp', (req, res, next) => teammembercontroller.SendResetPasswordOtp(req, res, next));
route.post('/forgot-password/reset-password', (req, res, next) => teammembercontroller.ResetPassword(req, res, next));
exports.default = route;
