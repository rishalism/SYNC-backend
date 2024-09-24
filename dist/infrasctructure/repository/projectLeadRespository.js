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
const ProjectLeadModel_1 = __importDefault(require("../databases/ProjectLeadModel"));
class ProjectLeadRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield ProjectLeadModel_1.default.findOne({ email: email });
            return findUser;
        });
    }
    saveprojectLeadInDb(projectLeadDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectLead = new ProjectLeadModel_1.default(projectLeadDetails);
            const saved = yield projectLead.save();
            return saved;
        });
    }
    projectDetailInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectLeadData = yield ProjectLeadModel_1.default.findOne({ email: email });
            return projectLeadData;
        });
    }
    updatePasswordByEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedLead = yield ProjectLeadModel_1.default.findOneAndUpdate({ email: email }, { $set: { password: password } }, { new: true });
            return updatedLead;
        });
    }
}
exports.default = ProjectLeadRepository;
