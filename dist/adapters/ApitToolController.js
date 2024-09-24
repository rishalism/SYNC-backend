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
class ApiToolController {
    constructor(apiUsecase) {
        this.apiUsecase = apiUsecase;
    }
    sendTotargetApi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url, method, body, queryParams, headers } = req.body;
                const reponse = yield this.apiUsecase.sendApiToTarget({ method, url, body, queryParams, headers });
                res.status(httpStatus_1.httpStatus.OK).json(reponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    saveTestedApi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, url, method, body } = req.body;
                // check if the same url and method is already saved 
                if (projectId) {
                    const isSameUrlAndMethod = yield this.apiUsecase.checkIfIsSame(projectId, method, url);
                    if (isSameUrlAndMethod) {
                        res.status(httpStatus_1.httpStatus.CONFLICT).json("This API has already been saved.");
                    }
                    else {
                        const response = yield this.apiUsecase.saveDetailsInDb({ projectId, url, method, body });
                        if (response) {
                            res.status(httpStatus_1.httpStatus.CREATED).json('stored in database');
                        }
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('please select an project');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getallSavedAPis(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = req.params.projectId;
            try {
                const response = yield this.apiUsecase.getAllStoredApis(projectId);
                if (response) {
                    res.status(httpStatus_1.httpStatus.OK).json(response);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    RemovSavedApi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, projectId } = req.body;
            try {
                const response = yield this.apiUsecase.RemoveStoredApi(projectId, id);
                if (response) {
                    res.status(httpStatus_1.httpStatus.OK).json('removed');
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = ApiToolController;
