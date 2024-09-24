"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = (0, express_1.default)();
const ProjectsController_1 = __importDefault(require("../../adapters/ProjectsController"));
const ProjectUseCase_1 = __importDefault(require("../../use_case/ProjectUseCase"));
const projectRepository_1 = __importDefault(require("../repository/projectRepository"));
const ProjectLeadAuth_1 = __importDefault(require("../middlewares/ProjectLeadAuth"));
const TeamMemberMiddleware_1 = __importDefault(require("../middlewares/TeamMemberMiddleware"));
const projectrepo = new projectRepository_1.default();
const projectusecase = new ProjectUseCase_1.default(projectrepo);
const projectcontroller = new ProjectsController_1.default(projectusecase);
//projects//
route.post('/', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.createProject(req, res, next));
route.get('/', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.getProjects(req, res, next));
route.get('/get/:projectId', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.GetcurrentProject(req, res, next));
route.delete('/:projectId', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.deleteProject(req, res, next));
route.put('/:projectId', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.editProject(req, res, next));
route.post('/add-member', TeamMemberMiddleware_1.default, (req, res, next) => projectcontroller.addMember(req, res, next));
route.post('/remove', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.removeMember(req, res, next));
route.patch('/access', ProjectLeadAuth_1.default, (req, res, next) => projectcontroller.UpdatePermissions(req, res, next));
exports.default = route;
