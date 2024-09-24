"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../infrasctructure/constants/jwt");
class Jwt {
    constructor() {
    }
    generateAccesToken(userId, role) {
        const jwtkey = process.env.ACCES_TOKEN_SECRET;
        if (!jwtkey) {
            throw new Error('Access token secret is not defined');
        }
        const payload = { userId, role };
        return jsonwebtoken_1.default.sign(payload, jwtkey, { expiresIn: jwt_1.ACCES_TOKEN_MAX_AGE });
    }
    generateRefreshToken(userId, role) {
        const jwtkey = process.env.REFRESH_TOKEN_SECRET;
        if (!jwtkey) {
            throw new Error('Refresh token secret is not defined');
        }
        const payload = { userId, role };
        return jsonwebtoken_1.default.sign(payload, jwtkey, { expiresIn: jwt_1.REFRESH_TOKEN_MAX_AGE });
    }
    createAccesTokenWithRefreshToken(token) {
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = this.generateAccesToken(decode.userId, decode.role);
            return accessToken;
        }
        catch (error) {
            console.error('Error verifying refresh token:', error);
            return null;
        }
    }
}
exports.default = Jwt;
