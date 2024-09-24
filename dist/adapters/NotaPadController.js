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
class NotePadController {
    constructor(notepadusecase, gemini) {
        this.notepadusecase = notepadusecase;
        this.gemini = gemini;
    }
    CreateNewNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, notes, is_visible, projectId } = req.body;
                const user_id = req.user;
                // check if the title already exist in database 
                const isExist = yield this.notepadusecase.checkIfThetitleAlreadyExist(title);
                if (isExist) {
                    res.status(httpStatus_1.httpStatus.BAD_REQUEST).json("title already exist");
                }
                else {
                    // save it in the database 
                    const isSaved = yield this.notepadusecase.CreateNewNote({ title, projectId, user_id, is_visible, notes });
                    if (isSaved)
                        res.status(httpStatus_1.httpStatus.OK).json(isSaved);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetNotes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = req.params.projectId;
                const user_id = req.user;
                if (projectId && user_id) {
                    const notes = yield this.notepadusecase.GetNotes(projectId, user_id);
                    if (notes) {
                        res.status(httpStatus_1.httpStatus.OK).json(notes);
                    }
                }
                else {
                    res.status(httpStatus_1.httpStatus.BAD_REQUEST).json("please select a project ");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    UpdateNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, _id, notes, is_visible, projectId } = req.body;
                const user_id = req.user;
                const isSaved = yield this.notepadusecase.UpdateNote({ _id, title, projectId, user_id, is_visible, notes });
                if (isSaved)
                    res.status(httpStatus_1.httpStatus.OK).json('note is updated');
            }
            catch (error) {
                next(error);
            }
        });
    }
    DeleteNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                // delete the note 
                const isDeleted = yield this.notepadusecase.DeleteNote(id);
                if (isDeleted) {
                    res.status(httpStatus_1.httpStatus.OK).json('note deleted');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    AskAi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { prompt } = req.body;
                const result = yield this.gemini.GenerateText(prompt);
                if (result) {
                    console.log(prompt);
                    console.log(result);
                    res.status(httpStatus_1.httpStatus.OK).json(result);
                }
                else {
                    res.status(httpStatus_1.httpStatus.EXPECTATION_FAILED).json('sorry we are facing heavy traffic . please wait !');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = NotePadController;
