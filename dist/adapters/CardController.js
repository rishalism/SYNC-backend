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
class CardController {
    constructor(cardusecase) {
        this.cardusecase = cardusecase;
    }
    AddCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, column, projectId, title } = req.body;
                // save in to databse 
                const saved = yield this.cardusecase.saveCardinDatabase({ id, column, projectId, title });
                if (saved) {
                    res.status(httpStatus_1.httpStatus.OK).json('card has been saves in Db');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetCards(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all cards by the project id 
                const projectId = req.params.projectId;
                const data = yield this.cardusecase.GetCardsByProjectId(projectId);
                if (data) {
                    res.status(httpStatus_1.httpStatus.OK).json(data);
                }
            }
            catch (error) {
            }
        });
    }
    Updatecard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, column, } = req.body;
                // update the colum by id 
                const updatedCard = yield this.cardusecase.UpdateCoulumn(_id, column);
                if (updatedCard) {
                    res.status(httpStatus_1.httpStatus.OK).json(updatedCard);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    AddtaskAndAssignMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { inputValue, assignedMemberIds, id } = req.body;
                // update by id and update task
                const updatedCard = yield this.cardusecase.assigntask(id, inputValue, assignedMemberIds);
                if (updatedCard) {
                    res.status(httpStatus_1.httpStatus.OK).json();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetCardById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const cardData = yield this.cardusecase.getcardByCardId(id);
                if (cardData) {
                    res.status(httpStatus_1.httpStatus.OK).json(cardData);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    DeleteCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                // delete card 
                const isCardDeleted = yield this.cardusecase.DeletCard(_id);
                if (isCardDeleted) {
                    res.status(httpStatus_1.httpStatus.OK).json('card deleted');
                }
            }
            catch (error) {
            }
        });
    }
    TaskDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId, id } = req.body;
                // delete task 
                const isTaskDeleted = yield this.cardusecase.DeleteTask(taskId, id);
                if (isTaskDeleted) {
                    res.status(httpStatus_1.httpStatus.OK).json('task deleted');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CardController;
