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
const role_1 = require("../infrasctructure/constants/role");
class ProjectController {
    constructor(projectusecase) {
        this.projectusecase = projectusecase;
    }
    createProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectName, description, projectOwner } = req.body;
                const isDeleted = false;
                //check project name is already exists ?//
                const isProjectExist = yield this.projectusecase.checkIsTheProjectExist(projectOwner, projectName);
                if (isProjectExist) {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json("A project with this name already exists.");
                }
                else {
                    const newProject = yield this.projectusecase.newProject({ projectName, description, projectOwner, isDeleted });
                    if (newProject) {
                        res.status(httpStatus_1.httpStatus.CREATED).json('project created');
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR).json('failed to create project');
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProjects(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerId = req.user;
                const role = req.role;
                if (role == role_1.Role.projectlead) {
                    const projects = yield this.projectusecase.getAllProjects(ownerId);
                    if (projects) {
                        res.status(httpStatus_1.httpStatus.OK).json({ projectData: projects });
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.NOT_FOUND).json('did not found ');
                    }
                }
                else if (role == role_1.Role.teammember) {
                    const projects = yield this.projectusecase.getALLProjectsOfTeamMember(ownerId);
                    if (projects) {
                        res.status(httpStatus_1.httpStatus.OK).json({ projectData: projects });
                    }
                    else {
                        res.status(httpStatus_1.httpStatus.NOT_FOUND).json('did not found ');
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    GetcurrentProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = req.params.projectId;
                const currentProject = yield this.projectusecase.getCurrentProject(projectId);
                if (currentProject) {
                    res.status(httpStatus_1.httpStatus.OK).json(currentProject);
                }
                else {
                    res.status(httpStatus_1.httpStatus.NOT_FOUND).json('did not found ');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = req.params.projectId;
                const deleted = yield this.projectusecase.DeleteProject(projectId);
                console.log(deleted);
                if (deleted) {
                    res.status(httpStatus_1.httpStatus.OK).json('project has been deleted');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    editProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectName, description, projectOwner } = req.body;
                const projectId = req.params.projectId;
                const isDeleted = false;
                const isProjectExist = yield this.projectusecase.checkIsTheProjectExist(projectOwner, projectName);
                if (isProjectExist) {
                    res.status(httpStatus_1.httpStatus.CONFLICT).json("A project with this name already exists.");
                }
                else {
                    const editProject = yield this.projectusecase.editProject(projectId, { projectName, description, projectOwner, isDeleted });
                    if (editProject) {
                        res.status(httpStatus_1.httpStatus.OK).json('project has been edited');
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    addMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberId, projectId } = req.body;
                // check the member is already exist in the project
                const isMemberExist = yield this.projectusecase.checktheMemberExist(projectId, memberId);
                if (isMemberExist) {
                    res.status(httpStatus_1.httpStatus.OK).json('you are already in this project');
                }
                else {
                    /// add to project 
                    const addMember = yield this.projectusecase.addMember(projectId, memberId);
                    if (addMember) {
                        res.status(httpStatus_1.httpStatus.OK).json('welcome to the project');
                    }
                }
            }
            catch (error) {
            }
        });
    }
    removeMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, projectId } = req.body;
                const removedUser = yield this.projectusecase.removeMemberFromProject(projectId, userId);
                if (removedUser) {
                    console.log(removedUser);
                    res.status(httpStatus_1.httpStatus.OK);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    UpdatePermissions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, userId, permissionType, access } = req.body;
                // update permision 
                const UpdatePermissions = yield this.projectusecase.UpdatePemissions(projectId, userId, permissionType, access);
                if (UpdatePermissions) {
                    res.status(httpStatus_1.httpStatus.OK).json('permission updated');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProjectController;
