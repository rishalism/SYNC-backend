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
class NotePadUsecase {
    constructor(notepadrepo) {
        this.notepadrepo = notepadrepo;
    }
    CreateNewNote(notepadDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notepadrepo.SaveNewNote(notepadDetails);
        });
    }
    checkIfThetitleAlreadyExist(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notepadrepo.checkIfTitleAlreadyExist(title);
        });
    }
    GetNotes(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notepadrepo.getNoteById(projectId, userId);
        });
    }
    UpdateNote(notepadDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notepadrepo.UpdateNoteById(notepadDetails);
        });
    }
    DeleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notepadrepo.DeleteBydId(id);
        });
    }
}
exports.default = NotePadUsecase;
