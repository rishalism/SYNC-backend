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
const DbDesignModal_1 = __importDefault(require("../databases/DbDesignModal"));
class DbDesignRepository {
    constructor() {
    }
    SaveDbDesignInDb(dbdesignData) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { projectId: dbdesignData.projectId };
            const update = {
                nodes: dbdesignData.nodes,
                edges: dbdesignData.edges,
                viewport: dbdesignData.viewport
            };
            const options = {
                new: true,
                upsert: true,
                useFindAndModify: false
            };
            const saved = yield DbDesignModal_1.default.findOneAndUpdate(filter, update, options);
            return saved;
        });
    }
    GetDbDesignsByprojectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DbDesignModal_1.default.findOne({ projectId });
        });
    }
}
exports.default = DbDesignRepository;
