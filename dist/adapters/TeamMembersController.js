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
const TeamMemberInterface_1 = require("../domain/TeamMemberInterface");
const httpStatus_1 = require("../infrasctructure/constants/httpStatus");
const jwt_1 = require("../infrasctructure/constants/jwt");
class TeamMemberController {
    constructor(teammemberUsecase, otpusecase, sendmails, jwt, generateOtp, invitationusecase) {
        this.teammemberUsecase = teammemberUsecase;
        this.otpusecase = otpusecase;
        this.sendmails = sendmails;
        this.jwt = jwt;
        this.generateOtp = generateOtp;
        this.invitationusecase = invitationusecase;
    }
    MemberSignup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, username } = req.body;
                console.log(password);
                // check if email exist 
                const emailExist = yield this.teammemberUsecase.checkIfEmailExist(email);
                if (!(emailExist === null || emailExist === void 0 ? void 0 : emailExist.email)) {
                    // generate otp 
                    const otp = yield this.generateOtp.generateOtp();
                    //send otp to mail 
                    console.log(otp);
                    yield this.sendmails.sendOtpMail(email, name, otp);
                    //save otp in database
                    yield this.otpusecase.saveotp({ otp, email, password, username });
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        const data = yield this.otpusecase.removeOtp(email);
                        if (data) {
                            console.log('otp expired');
                        }
                    }), jwt_1.OTP_TIMER);
                    res.status(httpStatus_1.httpStatus.OK).json({ message: 'otp have sented to email' });
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('email is already in use . try different email ');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOtpAndSaveMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, email, role, name, avatar } = req.body;
                // check otp is correct 
                const userdata = yield this.otpusecase.compareOtp(email, otp);
                console.log(userdata);
                if (userdata) {
                    // saving the projectMember info on database //
                    const teamMemberDetails = {
                        name: name,
                        email: email,
                        userName: userdata.username,
                        password: userdata.password,
                        avatar: avatar,
                        role: role,
                        isGoogle: false,
                        permissions: {
                            board: TeamMemberInterface_1.accessLevel.allow,
                            notepad: TeamMemberInterface_1.accessLevel.allow,
                            dbDesign: TeamMemberInterface_1.accessLevel.allow
                        }
                    };
                    const response = yield this.teammemberUsecase.saveTeamMember(teamMemberDetails);
                    if (response) {
                        res.status(httpStatus_1.httpStatus.OK).json('team member saved in database');
                        this.otpusecase.removeOtp(email);
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('failed to save member in database');
                    }
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
            try {
                const { email, password } = req.body;
                // check if email matches //
                const TeamMemberData = yield this.teammemberUsecase.checkIfEmailExist(email);
                if (TeamMemberData === null || TeamMemberData === void 0 ? void 0 : TeamMemberData.password) {
                    // check password matches //
                    const isPasswordCorrect = yield this.teammemberUsecase.isPasswordMatching(password, TeamMemberData === null || TeamMemberData === void 0 ? void 0 : TeamMemberData.password);
                    if (isPasswordCorrect && TeamMemberData.isGoogle == false) {
                        // getting teaMember data from database //
                        const teamMemberData = yield this.teammemberUsecase.getTeamMemberDetails(email);
                        if ((teamMemberData === null || teamMemberData === void 0 ? void 0 : teamMemberData._id) && (teamMemberData === null || teamMemberData === void 0 ? void 0 : teamMemberData.role)) {
                            // sending jwt response 
                            const accesstoken = yield this.jwt.generateAccesToken(teamMemberData._id, teamMemberData.role);
                            const refreshtoken = yield this.jwt.generateRefreshToken(teamMemberData._id, teamMemberData.role);
                            const data = {
                                id: teamMemberData._id,
                                name: teamMemberData.name,
                                username: teamMemberData.userName,
                                email: teamMemberData.email,
                                role: teamMemberData.role,
                                avatar: teamMemberData.avatar,
                                permissions: teamMemberData.permissions
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
                    else if ((TeamMemberData === null || TeamMemberData === void 0 ? void 0 : TeamMemberData.isGoogle) == true) {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('Try a different sigIn Method');
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
                const userName = name.split(" ").slice(0, 1).toString();
                const permissions = {
                    board: TeamMemberInterface_1.accessLevel.allow,
                    notepad: TeamMemberInterface_1.accessLevel.allow,
                    dbDesign: TeamMemberInterface_1.accessLevel.allow
                };
                const isGoogle = true;
                // check if email exist 
                const isEmailExist = yield this.teammemberUsecase.checkIfEmailExist(email);
                if (!isEmailExist) {
                    // create a new team member
                    const userdata = yield this.teammemberUsecase.saveTeamMember({ name, email, isGoogle, password, permissions, role, userName, avatar });
                    if ((userdata === null || userdata === void 0 ? void 0 : userdata._id) && userdata.role) {
                        // sending jwt as response
                        const accesstoken = yield this.jwt.generateAccesToken(userdata === null || userdata === void 0 ? void 0 : userdata._id, userdata === null || userdata === void 0 ? void 0 : userdata.role);
                        const refreshtoken = yield this.jwt.generateRefreshToken(userdata === null || userdata === void 0 ? void 0 : userdata._id, userdata === null || userdata === void 0 ? void 0 : userdata.role);
                        const data = {
                            id: userdata._id,
                            name: userdata.name,
                            username: userdata.userName,
                            email: userdata.email,
                            role: userdata.role,
                            avatar: userdata.avatar,
                            permissions: userdata.permissions
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
                        res.status(httpStatus_1.httpStatus.BAD_REQUEST).json('invalid user data .  try different sigup method');
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
            try {
                const { id: password, email: email, name: name, picture: avatar, role: role } = req.body;
                // check if email exist
                const isUser = yield this.teammemberUsecase.checkIfEmailExist(email);
                if (isUser === null || isUser === void 0 ? void 0 : isUser._id) {
                    if (isUser._id) {
                        // sending jwt as response
                        const accesstoken = yield this.jwt.generateAccesToken(isUser === null || isUser === void 0 ? void 0 : isUser._id, isUser === null || isUser === void 0 ? void 0 : isUser.role);
                        const refreshtoken = yield this.jwt.generateRefreshToken(isUser === null || isUser === void 0 ? void 0 : isUser._id, isUser === null || isUser === void 0 ? void 0 : isUser.role);
                        const data = {
                            id: isUser._id,
                            name: isUser.name,
                            username: isUser.userName,
                            email: isUser.email,
                            role: isUser.role,
                            avatar: isUser.avatar,
                            permissions: isUser.permissions
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
    acceptInvitation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, projectId } = req.body;
                const ifTokenisValid = yield this.invitationusecase.findInvitationToken(projectId);
                // chekc the token matches
                if (ifTokenisValid) {
                    const ifTokenMatches = yield this.invitationusecase.checkTheTokenMatches(token, ifTokenisValid.token);
                    if (ifTokenMatches) {
                        res.status(httpStatus_1.httpStatus.ACCEPTED).json('token matches');
                        /// remove token 
                        const removed = yield this.invitationusecase.DeleteToken(ifTokenisValid.token);
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json('token doesnt match');
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.BAD_REQUEST).json('this link has been expired');
                }
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
                /// check if email exist 
                const isEmailExist = yield this.teammemberUsecase.checkIfEmailExist(email);
                if (isEmailExist) {
                    const otp = yield this.generateOtp.generateOtp();
                    yield this.sendmails.sendforgotPaswordMail(email, otp, role);
                    /// save otp in database 
                    const saveOtp = yield this.otpusecase.SaveResetPasswordOtp(email, otp);
                    if (saveOtp) {
                        res.status(httpStatus_1.httpStatus.OK).json('OTP has been sented ');
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
    SendResetPasswordOtp(req, res, next) {
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
                const isPasswordUpdated = yield this.teammemberUsecase.UpdatePassword(email, password);
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
exports.default = TeamMemberController;
