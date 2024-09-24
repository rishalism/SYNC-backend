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
class NotificationController {
    constructor(notificatioonusecase) {
        this.notificatioonusecase = notificatioonusecase;
    }
    SaveNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, userId, notifications, time } = req.body;
                const notification = yield this.notificatioonusecase.SaveNotifications({ projectId, userId, notifications, time });
                if (notification) {
                    res.status(httpStatus_1.httpStatus.OK).json('notiifcation saved');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const userId = req.user;
                const notifications = yield this.notificatioonusecase.getNotifications(projectId, userId);
                if (notifications) {
                    res.status(httpStatus_1.httpStatus.OK).json(notifications);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    clearAllNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.body;
                const userId = req.user;
                console.log(req.body);
                console.log(userId);
                const notifications = yield this.notificatioonusecase.ClearNotifications(projectId, userId);
                if (notifications) {
                    res.status(httpStatus_1.httpStatus.OK).json('notiifcation cleared');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = NotificationController;
