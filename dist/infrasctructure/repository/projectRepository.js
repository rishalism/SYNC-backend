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
const ProjectModal_1 = __importDefault(require("../databases/ProjectModal"));
const TeamMemberModel_1 = __importDefault(require("../databases/TeamMemberModel"));
class projectRepository {
    SaveNewProject(projectdetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const newproject = yield new ProjectModal_1.default(projectdetails);
            return yield newproject.save();
        });
    }
    getprojects(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield ProjectModal_1.default.find({ projectOwner: ownerId, isDeleted: false }).populate('projectOwner').populate('ProjectMembers');
            if (projects) {
                return projects;
            }
        });
    }
    getCurrentProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield ProjectModal_1.default.findById(projectId).populate('projectOwner').populate('ProjectMembers');
            if (projects) {
                return projects;
            }
        });
    }
    getTeamMemberProjects(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield ProjectModal_1.default.find({ ProjectMembers: memberId, isDeleted: false }).populate('projectOwner').populate('ProjectMembers');
            if (projects) {
                return projects;
            }
        });
    }
    IsProjectNameExist(projectname, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProjectModal_1.default.findOne({ projectOwner: ownerId, projectName: projectname, isDeleted: false });
        });
    }
    deleteProject(projectid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProjectModal_1.default.findByIdAndUpdate(projectid, { isDeleted: true });
        });
    }
    editProject(projectId, projectdata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProjectModal_1.default.findByIdAndUpdate(projectId, {
                projectName: projectdata.projectName,
                projectOwner: projectdata.projectOwner,
                description: projectdata.description,
                isDeleted: projectdata.isDeleted
            }, { new: true });
        });
    }
    isMemberIsAlreadyExist(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const projectData = yield ProjectModal_1.default.findById(projectId);
            return (_a = projectData === null || projectData === void 0 ? void 0 : projectData.ProjectMembers) === null || _a === void 0 ? void 0 : _a.includes(memberId);
        });
    }
    addMemberToProject(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const added = yield ProjectModal_1.default.findByIdAndUpdate(projectId, {
                $push: { ProjectMembers: memberId }
            }, { new: true });
            return added;
        });
    }
    removeMemberFromProject(projecId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const removed = yield ProjectModal_1.default.findByIdAndUpdate(projecId, {
                $pull: { ProjectMembers: memberId }
            }, { new: true });
            return removed;
        });
    }
    UpdateMemberPermission(projectId, userId, permissionType, access) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPermission = yield TeamMemberModel_1.default.findByIdAndUpdate(userId, {
                $set: {
                    [`permissions.${permissionType}`]: access
                }
            }, { new: true } // This option returns the modified document
            );
            return updatedPermission;
        });
    }
}
exports.default = projectRepository;
