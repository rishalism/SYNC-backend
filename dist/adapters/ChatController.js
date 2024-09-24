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
class ChatController {
    constructor(chatusecase) {
        this.chatusecase = chatusecase;
    }
    SaveChats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, sender, text, timestamp, projectId } = req.body;
                const message = yield this.chatusecase.saveMessage({ id, sender, text, timestamp });
                if (message) {
                    const data = {
                        projectId: projectId,
                        messages: [{
                                id: message.id,
                                sender: {
                                    id: message.sender.id,
                                    avatar: message.sender.avatar,
                                    name: message.sender.name
                                },
                                text: message.text,
                                timestamp: message.timestamp
                            }]
                    };
                    // Save or update the conversation
                    const conversation = yield this.chatusecase.saveChats(data);
                    if (conversation) {
                        res.status(httpStatus_1.httpStatus.OK).json('chat saved');
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetChats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = req.params.projectId;
                // get chats by project id 
                const chats = yield this.chatusecase.Getchats(projectId);
                if (chats) {
                    res.status(httpStatus_1.httpStatus.OK).json(chats);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ChatController;
