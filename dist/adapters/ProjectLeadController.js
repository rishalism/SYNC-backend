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
const httpStatus_1 = require("../infrasctructure/constants/httpStatus");
const jwt_1 = require("../infrasctructure/constants/jwt");
class ProjectLeadController {
    constructor(generateOtp, projectleadusecase, sendemails, otpusecase, jwt, generateurl) {
        this.generateOtp = generateOtp;
        this.projectleadusecase = projectleadusecase;
        this.sendemails = sendemails;
        this.otpusecase = otpusecase;
        this.jwt = jwt;
        this.generateurl = generateurl;
    }
    Signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, username } = req.body;
                // check if email exits 
                const ProjectLeadExist = yield this.projectleadusecase.checkEmailExist(email);
                if (!ProjectLeadExist.data) {
                    // generate otp here 
                    const otp = yield this.generateOtp.generateOtp();
                    // save otp in db
                    yield this.otpusecase.saveotp({ otp, email, password, username });
                    yield this.sendemails.sendOtpMail(email, name, otp);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        const data = yield this.otpusecase.removeOtp(email);
                        if (data) {
                            console.log('otp expired');
                        }
                    }), jwt_1.OTP_TIMER);
                    res.status(httpStatus_1.httpStatus.OK).json({ message: 'otp have sented to email' });
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('email is already in use. try different email');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOtpAndSaveUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, email, role, name, avatar } = req.body;
                /// cheking otp mathces //
                const userdata = yield this.otpusecase.compareOtp(email, otp);
                if (userdata) {
                    // saving the userinfo in database //
                    const projectLeadDetails = {
                        name: name,
                        email: email,
                        avatar: avatar,
                        username: userdata.username,
                        password: userdata.password,
                        isGoogle: false,
                        role: role
                    };
                    yield this.projectleadusecase.saveProjectLead(projectLeadDetails);
                    // after saving user detail removing otp //
                    yield this.otpusecase.removeOtp(email);
                    res.status(httpStatus_1.httpStatus.OK).json('user created successfully');
                }
                else if (userdata == false) {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('OTP expired . try resending OTP');
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('invalid OTP please try again');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email, password } = req.body;
                // check email matches //
                console.log(req.body);
                const ProjectLeadData = yield this.projectleadusecase.checkEmailExist(email);
                if ((_a = ProjectLeadData.data) === null || _a === void 0 ? void 0 : _a.password) {
                    // check password matches //
                    const isPasswordMatch = yield this.projectleadusecase.IsPasswordMatching(password, ProjectLeadData === null || ProjectLeadData === void 0 ? void 0 : ProjectLeadData.data.password);
                    if (isPasswordMatch && ProjectLeadData.data.isGoogle == false) {
                        if ((ProjectLeadData === null || ProjectLeadData === void 0 ? void 0 : ProjectLeadData.data._id) && ProjectLeadData.data.role) {
                            // sending back jwt token as response //
                            const accesstoken = yield this.jwt.generateAccesToken(ProjectLeadData === null || ProjectLeadData === void 0 ? void 0 : ProjectLeadData.data._id, ProjectLeadData === null || ProjectLeadData === void 0 ? void 0 : ProjectLeadData.data.role);
                            const refreshtoken = yield this.jwt.generateRefreshToken(ProjectLeadData === null || ProjectLeadData === void 0 ? void 0 : ProjectLeadData.data._id, ProjectLeadData === null || ProjectLeadData === void 0 ? void 0 : ProjectLeadData.data.role);
                            const data = {
                                id: ProjectLeadData.data._id,
                                name: ProjectLeadData.data.name,
                                username: ProjectLeadData.data.username,
                                email: ProjectLeadData.data.email,
                                role: ProjectLeadData.data.role,
                                avatar: ProjectLeadData.data.avatar
                            };
                            if (refreshtoken) {
                                res.cookie('refreshtoken', refreshtoken, {
                                    httpOnly: true,
                                    maxAge: jwt_1.REFRESH_TOKEN_MAX_AGE,
                                    secure: process.env.NODE_ENV !== "development",
                                    sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
                                });
                            }
                            res.status(httpStatus_1.httpStatus.OK).json({
                                accesstoken,
                                data
                            });
                        }
                        else {
                            res.status(httpStatus_1.httpStatus.BAD_REQUEST).json('invalid user data');
                        }
                    }
                    else if (ProjectLeadData.data.isGoogle == true) {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('try different signIn method');
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('password is incorrect');
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please check the email and try again.");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    googleSignup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: password, email: email, name: name, picture: avatar, role: role } = req.body;
                const username = name.split(" ").slice(0, 1).toString();
                const isGoogle = true;
                // check if email exist 
                const isEmailExist = yield this.projectleadusecase.checkEmailExist(email);
                if (!isEmailExist.data) {
                    // create new user
                    const userdata = yield this.projectleadusecase.saveProjectLead({ name, email, username, isGoogle, password, avatar, role });
                    if (userdata._id && userdata.role) {
                        // sending back jwt token as response //
                        const accesstoken = yield this.jwt.generateAccesToken(userdata === null || userdata === void 0 ? void 0 : userdata._id, userdata === null || userdata === void 0 ? void 0 : userdata.role);
                        const refreshtoken = yield this.jwt.generateRefreshToken(userdata === null || userdata === void 0 ? void 0 : userdata._id, userdata === null || userdata === void 0 ? void 0 : userdata.role);
                        const data = {
                            id: userdata._id,
                            name: userdata.name,
                            username: userdata.username,
                            email: userdata.email,
                            role: userdata.role,
                            avatar: userdata.avatar
                        };
                        if (refreshtoken) {
                            res.cookie('refreshtoken', refreshtoken, {
                                httpOnly: true,
                                maxAge: jwt_1.REFRESH_TOKEN_MAX_AGE,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
                            });
                        }
                        res.status(httpStatus_1.httpStatus.OK).json({
                            accesstoken,
                            data
                        });
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.BAD_REQUEST).json('invalid user data');
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('email is already in use. try different email');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    googleSignin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const { id: password, email: email, name: name, picture: avatar, role: role } = req.body;
                // check if email exist 
                const isUser = yield this.projectleadusecase.checkEmailExist(email);
                if (isUser.data) {
                    if (isUser.data._id && (isUser === null || isUser === void 0 ? void 0 : isUser.data.role)) {
                        // sending back jwt token as response //
                        const accesstoken = yield this.jwt.generateAccesToken((_a = isUser === null || isUser === void 0 ? void 0 : isUser.data) === null || _a === void 0 ? void 0 : _a._id, (_b = isUser === null || isUser === void 0 ? void 0 : isUser.data) === null || _b === void 0 ? void 0 : _b.role);
                        const refreshtoken = yield this.jwt.generateRefreshToken((_c = isUser === null || isUser === void 0 ? void 0 : isUser.data) === null || _c === void 0 ? void 0 : _c._id, (_d = isUser === null || isUser === void 0 ? void 0 : isUser.data) === null || _d === void 0 ? void 0 : _d.role);
                        isUser === null || isUser === void 0 ? void 0 : isUser.data;
                        const data = {
                            id: isUser === null || isUser === void 0 ? void 0 : isUser.data._id,
                            name: isUser === null || isUser === void 0 ? void 0 : isUser.data.name,
                            username: isUser === null || isUser === void 0 ? void 0 : isUser.data.username,
                            email: isUser === null || isUser === void 0 ? void 0 : isUser.data.email,
                            role: isUser === null || isUser === void 0 ? void 0 : isUser.data.role,
                            avatar: isUser === null || isUser === void 0 ? void 0 : isUser.data.avatar
                        };
                        if (refreshtoken) {
                            res.cookie('refreshtoken', refreshtoken, {
                                httpOnly: true,
                                maxAge: jwt_1.REFRESH_TOKEN_MAX_AGE,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
                            });
                        }
                        res.status(httpStatus_1.httpStatus.OK).json({
                            accesstoken,
                            data
                        });
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('try different signIn method');
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please create a new account or try again with a different email.");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    inviteMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, email, projectOwner } = req.body;
                const url = yield this.generateurl.genereteUniqueLink(projectId, projectOwner);
                yield this.sendemails.sendInvitationMail(email, projectOwner, url);
                res.status(httpStatus_1.httpStatus.OK).json("Invitation sent successfully");
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, role } = req.body;
                // check if email exist 
                const isEmailExist = yield this.projectleadusecase.checkEmailExist(email);
                if (isEmailExist) {
                    const otp = yield this.generateOtp.generateOtp();
                    yield this.sendemails.sendforgotPaswordMail(email, otp, role);
                    // save reset password otp 
                    const saved = yield this.otpusecase.SaveResetPasswordOtp(email, otp);
                    if (saved) {
                        res.status(httpStatus_1.httpStatus.OK).json(otp);
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('failed to sent OTP to your email , please double check your Email');
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json("We couldn’t find an account with that email address. Please create a new account or try again with a different email.");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyResetPassworOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, email } = req.body;
                // check if otp is correct
                const isOtpMatches = yield this.otpusecase.RestPassowrdcompareOtp(email, otp);
                console.log(isOtpMatches);
                if (isOtpMatches) {
                    res.status(httpStatus_1.httpStatus.OK).json('otp is correct');
                    yield this.otpusecase.RemoveRestPassowrdOtp(email);
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('invalid otp ');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    ResetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // update the password
                const isPasswordUpdated = yield this.projectleadusecase.UpdatePassword(email, password);
                if (isPasswordUpdated) {
                    res.status(httpStatus_1.httpStatus.ACCEPTED).json('password is changed');
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('failed to Reset password');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProjectLeadController;
