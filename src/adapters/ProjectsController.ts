import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import ProjectUseCase from "../use_case/ProjectUseCase";




export default class ProjectController {
    constructor(
        private projectusecase: ProjectUseCase
    ) { }



    async createProject(req: Req, res: Res, next: Next) {
        try {

            console.log(req.cookies, '---------------------------from projectcontroller--------------------------------');

            const { projectName, description, projectOwner } = req.body;
            //check project name is already exists ?//

            const isProjectExist = await this.projectusecase.checkIsTheProjectExist(projectOwner, projectName)
            if (isProjectExist) {
                res.status(httpStatus.CONFLICT).json("A project with this name already exists.")
            } else {
                const newProject = await this.projectusecase.newProject({ projectName, description, projectOwner })
                if (newProject) {
                    res.status(httpStatus.CREATED).json('project created')
                } else {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json('failed to create project')
                }
            }

        } catch (error) {
            next(error)
        }
    }


    async getProjects(req: Req | any, res: Res, next: Next) {
        try {
            const ownerId = req.user
            console.log(ownerId, '=====================ownerId================================');

            const projects = await this.projectusecase.getAllProjects(ownerId)
            if (projects) {
                res.status(httpStatus.OK).json({ projectData: projects })
            } else {
                res.status(httpStatus.NOT_FOUND).json('did not found ')
            }
        } catch (error) {
            next(error)
        }
    }


    async deleteProject(req: Req, res: Res, next: Next) {
        try {
            const projectId = req.params.projectId
            console.log(projectId);
            const deleted = await this.projectusecase.DeleteProject(projectId)
            console.log(deleted);
            if (deleted) {
                res.status(httpStatus.OK).json('project has been deleted')
            }
        } catch (error) {
            next(error)
        }
    }


    async editProject(req: Req, res: Res, next: Next) {
        try {
            const { projectName, description, projectOwner } = req.body
            const projectId = req.params.projectId
            const editProject = await this.projectusecase.editProject(projectId, { projectName, description, projectOwner })
            console.log(editProject);
            if (editProject) {
                res.status(httpStatus.OK).json('project has been edited')
            }
        } catch (error) {
            next(error)
        }
    }


}