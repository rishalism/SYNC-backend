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
class DbdesignController {
    constructor(dbdesignusecase) {
        this.dbdesignusecase = dbdesignusecase;
    }
    SaveDbDesign(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dbdesignData } = req.body;
            /// save db design 
            try {
                const saved = yield this.dbdesignusecase.saveDbDesign(dbdesignData);
                if (saved) {
                    console.log(saved);
                    res.status(httpStatus_1.httpStatus.OK).json('saved in database');
                }
                else {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json('failed to  save in database . please try again later');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetDbdesign(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get db designs
            const { projectId } = req.params;
            try {
                const dbDesignData = yield this.dbdesignusecase.getdbdesignByProjectId(projectId);
                if (dbDesignData) {
                    res.status(httpStatus_1.httpStatus.OK).json(dbDesignData);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DbdesignController;
