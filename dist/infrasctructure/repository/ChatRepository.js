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
const ChatModal_1 = __importDefault(require("../databases/ChatModal"));
const MessageModal_1 = __importDefault(require("../databases/MessageModal"));
class ChatRepository {
    constructor() { }
    SaveMessage(messageDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield new MessageModal_1.default(messageDetails);
            return yield message.save();
        });
    }
    SaveChatInDB(chatDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatModal_1.default.findOneAndUpdate({ projectId: chatDetails.projectId }, // Match the document by projectId
            {
                $push: { messages: { $each: chatDetails.messages } } // Push each message into the messages array
            }, {
                upsert: true, // Create the document if it doesn't exist
                new: true // Return the updated document
            });
            return chat;
        });
    }
    GetChatByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ChatModal_1.default.findOne({ projectId });
        });
    }
}
exports.default = ChatRepository;
