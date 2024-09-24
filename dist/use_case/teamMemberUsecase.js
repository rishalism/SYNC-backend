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
class TeamMemberUsecase {
    constructor(teammemberRepo, encrypt) {
        this.teammemberRepo = teammemberRepo;
        this.encrypt = encrypt;
    }
    checkIfEmailExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.teammemberRepo.findbyemail(email);
        });
    }
    getTeamMemberDetails(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.teammemberRepo.findbyemail(email);
        });
    }
    isPasswordMatching(password, DbPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.encrypt.compare(password, DbPassword);
        });
    }
    saveTeamMember(teamMemberDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (teamMemberDetails) {
                return yield this.teammemberRepo.saveMembers(teamMemberDetails);
            }
            else {
                return null;
            }
        });
    }
    UpdatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.encrypt.hashpassord(password);
            return yield this.teammemberRepo.UpdatePasswordByEmail(email, hashedPassword);
        });
    }
}
exports.default = TeamMemberUsecase;
