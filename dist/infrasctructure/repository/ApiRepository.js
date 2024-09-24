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
const ApiTestingModal_1 = __importDefault(require("../databases/ApiTestingModal"));
class ApiRepository {
    constructor() {
    }
    saveTestedApiInDb(apiDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const saved = new ApiTestingModal_1.default(apiDetails);
            return yield saved.save();
        });
    }
    checkMethodAndUrlIsSame(projectId, method, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const apidetails = yield ApiTestingModal_1.default.findOne({ projectId, url, method });
            return apidetails;
        });
    }
    findByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ApiTestingModal_1.default.find({ projectId });
        });
    }
    removeOnByprojectid(projectId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ApiTestingModal_1.default.findByIdAndDelete(id, { projectId });
        });
    }
}
exports.default = ApiRepository;
