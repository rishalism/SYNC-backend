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
            const ownerId  = req.user
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


}