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
const CardsModal_1 = __importDefault(require("../databases/CardsModal"));
class CardRepository {
    constructor() { }
    createNewCard(NewCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCard = yield new CardsModal_1.default(NewCard);
            return yield newCard.save();
        });
    }
    CardByproject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cards = yield CardsModal_1.default.find({ projectId: projectId }).exec();
            return cards;
        });
    }
    findbyIdAndupdate(id, column) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CardsModal_1.default.findByIdAndUpdate(id, { column: column });
        });
    }
    assigntasktomembers(id, task, assignedMembers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CardsModal_1.default.findByIdAndUpdate(id, {
                $push: {
                    data: {
                        task: task,
                        assignedMembers: assignedMembers
                    }
                },
                $addToSet: {
                    TotalassignedMembers: { $each: assignedMembers }
                }
            }, { new: true, runValidators: true });
        });
    }
    getOneCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield CardsModal_1.default.findById(id);
            return data;
        });
    }
    DeleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CardsModal_1.default.findByIdAndDelete(id);
        });
    }
    DeleteTaskById(taskId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield CardsModal_1.default.findByIdAndUpdate(id, { $pull: { data: { _id: taskId } } }, { new: true });
            return result;
        });
    }
}
exports.default = CardRepository;
