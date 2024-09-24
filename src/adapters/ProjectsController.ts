import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { Role } from "../infrasctructure/constants/role";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import ProjectUseCase from "../use_case/ProjectUseCase";




export default class ProjectController {
    constructor(
        private projectusecase: ProjectUseCase
    ) { }



    async createProject(req: Req, res: Res, next: Next) {
        try {

            const { projectName, description, projectOwner } = req.body;
            const isDeleted = false
            //check project name is already exists ?//

            const isProjectExist = await this.projectusecase.checkIsTheProjectExist(projectOwner, projectName)
            if (isProjectExist) {
                res.status(httpStatus.CONFLICT).json("A project with this name already exists.")
            } else {
                const newProject = await this.projectusecase.newProject({ projectName, description, projectOwner, isDeleted })
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
            const role = req.role
            if (role == Role.projectlead) {
                const projects = await this.projectusecase.getAllProjects(ownerId)
                if (projects) {
                    res.status(httpStatus.OK).json({ projectData: projects })
                } else {
                    res.status(httpStatus.NOT_FOUND).json('did not found ')
                }
            } else if (role == Role.teammember) {
                const projects = await this.projectusecase.getALLProjectsOfTeamMember(ownerId)
                if (projects) {
                    res.status(httpStatus.OK).json({ projectData: projects })
                } else {
                    res.status(httpStatus.NOT_FOUND).json('did not found ')
                }
            }

        } catch (error) {
            next(error)
        }
    }



    async GetcurrentProject(req: Req, res: Res, next: Next) {
        try {
            const projectId = req.params.projectId
            const currentProject = await this.projectusecase.getCurrentProject(projectId)
            if (currentProject) {
                res.status(httpStatus.OK).json(currentProject)
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
            const isDeleted = false

            const editProject = await this.projectusecase.editProject(projectId, { projectName, description, projectOwner, isDeleted })
            if (editProject) {
                res.status(httpStatus.OK).json('project has been edited')
            }
        } catch (error) {
            next(error)
        }
    }


    async addMember(req: Req, res: Res, next: Next) {
        try {
            const { memberId, projectId } = req.body
            // check the member is already exist in the project
            const isMemberExist = await this.projectusecase.checktheMemberExist(projectId, memberId)
            if (isMemberExist) {
                res.status(httpStatus.OK).json('you are already in this project')
            } else {
                /// add to project 
                const addMember = await this.projectusecase.addMember(projectId, memberId)
                if (addMember) {

                    res.status(httpStatus.OK).json('welcome to the project')
                }
            }

        } catch (error) {

        }
    }

    async removeMember(req: Req, res: Res, next: Next) {
        try {
            const { userId, projectId } = req.body
            const removedUser = await this.projectusecase.removeMemberFromProject(projectId, userId)
            if (removedUser) {
                console.log(removedUser);
                res.status(httpStatus.OK)
            }
        } catch (error) {
            next(error)
        }
    }


    async UpdatePermissions(req: Req, res: Res, next: Next) {
        try {
            const { projectId, userId, permissionType, access } = req.body
            // update permision 
            const UpdatePermissions = await this.projectusecase.UpdatePemissions(projectId, userId, permissionType, access)
            if (UpdatePermissions) {
                res.status(httpStatus.OK).json('permission updated')
            }
        } catch (error) {
            next(error)
        }
    }



}