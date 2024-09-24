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
class ProjectUseCase {
    constructor(projectrepo) {
        this.projectrepo = projectrepo;
    }
    newProject(projectDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (projectDetails) {
                return yield this.projectrepo.SaveNewProject(projectDetails);
            }
            else {
                return null;
            }
        });
    }
    getAllProjects(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.getprojects(memberId);
        });
    }
    getCurrentProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.getCurrentProject(projectId);
        });
    }
    getALLProjectsOfTeamMember(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.getTeamMemberProjects(ownerId);
        });
    }
    checkIsTheProjectExist(projectname, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.IsProjectNameExist(ownerId, projectname);
        });
    }
    checktheMemberExist(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.isMemberIsAlreadyExist(projectId, memberId);
        });
    }
    DeleteProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.deleteProject(projectId);
        });
    }
    editProject(projectId, projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.editProject(projectId, projectData);
        });
    }
    addMember(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.addMemberToProject(projectId, memberId);
        });
    }
    removeMemberFromProject(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.removeMemberFromProject(projectId, memberId);
        });
    }
    UpdatePemissions(projectId, userId, permissionType, access) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectrepo.UpdateMemberPermission(projectId, userId, permissionType, access);
        });
    }
}
exports.default = ProjectUseCase;
