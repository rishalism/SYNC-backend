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
const NotePadInterface_1 = require("../../domain/NotePadInterface");
const NotePadModal_1 = __importDefault(require("../databases/NotePadModal"));
class NotePadRepository {
    constructor() { }
    checkIfTitleAlreadyExist(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return NotePadModal_1.default.findOne({ title: title });
        });
    }
    SaveNewNote(noteDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield new NotePadModal_1.default(noteDetails);
            return yield note.save();
        });
    }
    getNoteById(projectId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(projectId, userid);
            const note = yield NotePadModal_1.default.find({ projectId: projectId, $or: [{ is_visible: NotePadInterface_1.ISVISIBLE.TO_EVERYONE }, { user_id: userid }] });
            return note;
        });
    }
    UpdateNoteById(notepadDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NotePadModal_1.default.findByIdAndUpdate(notepadDetails._id, { title: notepadDetails.title, notes: notepadDetails.notes, is_visible: notepadDetails.is_visible });
        });
    }
    DeleteBydId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            return yield NotePadModal_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = NotePadRepository;
