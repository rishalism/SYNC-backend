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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TeamMemberModel_1 = __importDefault(require("../databases/TeamMemberModel"));
class TeamMemberRepository {
    constructor() { }
    findbyemail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const TeamMemberDetails = yield TeamMemberModel_1.default.findOne({ email: email });
            return TeamMemberDetails;
        });
    }
    saveMembers(memberdetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberData = yield new TeamMemberModel_1.default(memberdetails);
            return yield memberData.save();
        });
    }
    UpdatePasswordByEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TeamMemberModel_1.default.findOneAndUpdate({ email: email }, { $set: { password: password } }, { new: true });
        });
    }
}
exports.default = TeamMemberRepository;
