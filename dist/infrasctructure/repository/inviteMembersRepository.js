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
const InviteModal_1 = __importDefault(require("../databases/InviteModal"));
class InviteMembersRepository {
    constructor() { }
    saveInviteToken(inviteDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveToken = yield new InviteModal_1.default(inviteDetails);
            return saveToken.save();
        });
    }
    findtoken(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checktoken = yield InviteModal_1.default.findOne({ projectId: projectId });
            if (checktoken) {
                return checktoken;
            }
            else {
                return null;
            }
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield InviteModal_1.default.findOneAndDelete({ token: token });
        });
    }
}
exports.default = InviteMembersRepository;
