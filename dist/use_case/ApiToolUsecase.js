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
const axios_1 = __importDefault(require("axios"));
class ApiToolUseCase {
    constructor(apitoolrepo) {
        this.apitoolrepo = apitoolrepo;
    }
    sendApiToTarget(targetDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const validHeaders = targetDetails.headers
                ? Object.fromEntries(Object.entries(targetDetails.headers).filter(([key, value]) => typeof key === 'string' && key.trim() !== '' && typeof value === 'string' && value.trim() !== ''))
                : { "Content-Type": 'application/json' }; // Default headers if none provided
            const validParams = targetDetails.queryParams
                ? Object.fromEntries(Object.entries(targetDetails.queryParams).filter(([key, value]) => typeof key === 'string' && key.trim() !== '' && typeof value === 'string' && value.trim() !== ''))
                : {};
            const startTime = performance.now();
            try {
                const response = yield (0, axios_1.default)({
                    url: targetDetails.url,
                    method: targetDetails.method,
                    data: targetDetails.body,
                    headers: validHeaders,
                    params: validParams,
                });
                const endTime = performance.now();
                const time = Math.round(endTime - startTime);
                const data = {
                    status: response.status,
                    statustext: response.statusText,
                    header: response.headers,
                    body: response.data,
                    time: time
                };
                return data;
            }
            catch (error) {
                const endTime = performance.now();
                const time = Math.round(endTime - startTime);
                const data = {
                    status: error.response.status,
                    header: error.response.headers,
                    body: error.response.statusText,
                    time: time
                };
                return data;
            }
        });
    }
    checkIfIsSame(projectId, method, url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apitoolrepo.checkMethodAndUrlIsSame(projectId, method, url);
        });
    }
    saveDetailsInDb(apiDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apitoolrepo.saveTestedApiInDb(apiDetails);
        });
    }
    getAllStoredApis(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apitoolrepo.findByProjectId(projectId);
        });
    }
    RemoveStoredApi(projectId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apitoolrepo.removeOnByprojectid(projectId, id);
        });
    }
}
exports.default = ApiToolUseCase;
