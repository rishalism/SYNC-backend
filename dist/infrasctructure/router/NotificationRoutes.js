"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommonAuth_1 = __importDefault(require("../middlewares/CommonAuth"));
const NotificationController_1 = __importDefault(require("../../adapters/NotificationController"));
const NotifcationUsecase_1 = __importDefault(require("../../use_case/NotifcationUsecase"));
const NotificationRepo_1 = __importDefault(require("../repository/NotificationRepo"));
const route = (0, express_1.default)();
const notificationrepo = new NotificationRepo_1.default();
const notificationusecase = new NotifcationUsecase_1.default(notificationrepo);
const notificationcontroller = new NotificationController_1.default(notificationusecase);
route.post('/notification/save', CommonAuth_1.default, (req, res, next) => notificationcontroller.SaveNotification(req, res, next));
route.get('/notification/:projectId', CommonAuth_1.default, (req, res, next) => notificationcontroller.getNotifications(req, res, next));
route.post('/notifications/clear', CommonAuth_1.default, (req, res, next) => notificationcontroller.clearAllNotifications(req, res, next));
exports.default = route;
