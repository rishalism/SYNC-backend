"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApitToolController_1 = __importDefault(require("../../adapters/ApitToolController"));
const ApiToolUsecase_1 = __importDefault(require("../../use_case/ApiToolUsecase"));
const ApiRepository_1 = __importDefault(require("../repository/ApiRepository"));
const CommonAuth_1 = __importDefault(require("../middlewares/CommonAuth"));
const apitoolrepo = new ApiRepository_1.default();
const apitoolusecase = new ApiToolUsecase_1.default(apitoolrepo);
const apitoolcontroller = new ApitToolController_1.default(apitoolusecase);
const route = (0, express_1.default)();
route.post('/api/test', CommonAuth_1.default, (req, res, next) => apitoolcontroller.sendTotargetApi(req, res, next));
route.post('/save', CommonAuth_1.default, (req, res, next) => apitoolcontroller.saveTestedApi(req, res, next));
route.post('/tests/:projectId', CommonAuth_1.default, (req, res, next) => apitoolcontroller.getallSavedAPis(req, res, next));
route.post('/delete', CommonAuth_1.default, (req, res, next) => apitoolcontroller.RemovSavedApi(req, res, next));
exports.default = route;
