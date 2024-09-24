"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommonAuth_1 = __importDefault(require("../middlewares/CommonAuth"));
const DbDesignController_1 = __importDefault(require("../../adapters/DbDesignController"));
const DbDesignRepository_1 = __importDefault(require("../repository/DbDesignRepository"));
const DbDesignUsecase_1 = __importDefault(require("../../use_case/DbDesignUsecase"));
const route = (0, express_1.default)();
const dbdesignrepository = new DbDesignRepository_1.default();
const dbdesignusecase = new DbDesignUsecase_1.default(dbdesignrepository);
const dbdesigncontroller = new DbDesignController_1.default(dbdesignusecase);
route.post('/Dbdesign/save', CommonAuth_1.default, (req, res, next) => dbdesigncontroller.SaveDbDesign(req, res, next));
route.get('/dbDesign/get/:projectId', CommonAuth_1.default, (req, res, next) => dbdesigncontroller.GetDbdesign(req, res, next));
exports.default = route;
