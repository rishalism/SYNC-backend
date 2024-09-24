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
const uuid_1 = require("uuid");
class GenerateLink {
    constructor(inviteRepo, encrypt) {
        this.inviteRepo = inviteRepo;
        this.encrypt = encrypt;
    }
    genereteUniqueLink(projectId, projectOwner) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = (0, uuid_1.v4)();
            const baseUrl = process.env.CORS_URL;
            const url = `${baseUrl}/api/v1/links/?token=${key}&projectId=${projectId}`;
            const token = yield this.encrypt.hashpassord(key);
            yield this.inviteRepo.saveInviteToken({ token, projectId, projectOwner });
            return url;
        });
    }
}
exports.default = GenerateLink;
