"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommonAuth_1 = __importDefault(require("../middlewares/CommonAuth"));
const ChatController_1 = __importDefault(require("../../adapters/ChatController"));
const ChatRepository_1 = __importDefault(require("../repository/ChatRepository"));
const ChatUsecase_1 = __importDefault(require("../../use_case/ChatUsecase"));
const route = (0, express_1.default)();
const chatrepo = new ChatRepository_1.default();
const chatusecase = new ChatUsecase_1.default(chatrepo);
const chatcontroller = new ChatController_1.default(chatusecase);
route.post('/chat/save', CommonAuth_1.default, (req, res, next) => chatcontroller.SaveChats(req, res, next));
route.get('/chat/get/:projectId', CommonAuth_1.default, (req, res, next) => chatcontroller.GetChats(req, res, next));
exports.default = route;
