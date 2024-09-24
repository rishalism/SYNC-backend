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
class ProjectLeadUseCase {
    constructor(projectLeadRepo, encrypt) {
        this.projectLeadRepo = projectLeadRepo;
        this.encrypt = encrypt;
    }
    checkEmailExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectleadExist = yield this.projectLeadRepo.findByEmail(email);
            return {
                status: httpStatus_1.httpStatus.CONFLICT,
                data: projectleadExist
            };
        });
    }
    saveProjectLead(projectLeadDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectLead = yield this.projectLeadRepo.saveprojectLeadInDb(projectLeadDetails);
            return projectLead;
        });
    }
    IsPasswordMatching(password, passwordInDb) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.encrypt.compare(password, passwordInDb);
            return data;
        });
    }
    GetProjectLeadDetails(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectLeadRepo.projectDetailInfo(email);
        });
    }
    UpdatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.encrypt.hashpassord(password);
            return yield this.projectLeadRepo.updatePasswordByEmail(email, hashedPassword);
        });
    }
}
exports.default = ProjectLeadUseCase;
