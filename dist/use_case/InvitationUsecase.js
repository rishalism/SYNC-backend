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
class InvitationUsecase {
    constructor(inviterepo, encrypt) {
        this.inviterepo = inviterepo;
        this.encrypt = encrypt;
    }
    findInvitationToken(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.inviterepo.findtoken(projectId);
            if (data) {
                return data;
            }
            else {
                return null;
            }
        });
    }
    checkTheTokenMatches(token, tokenIndb) {
        return __awaiter(this, void 0, void 0, function* () {
            //compare 
            const data = yield this.encrypt.compare(token, tokenIndb);
            return data;
        });
    }
    DeleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviterepo.deleteToken(token);
        });
    }
}
exports.default = InvitationUsecase;
