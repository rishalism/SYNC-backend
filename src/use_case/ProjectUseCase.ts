import { Project } from "../domain/ProjectInterface";
import projectRepository from "../infrasctructure/repository/projectRepository";




export default class ProjectUseCase {
    constructor(
        private projectrepo: projectRepository
    ) { }


    async newProject(projectDetails: Project) {
        if (projectDetails) {
            return await this.projectrepo.SaveNewProject(projectDetails)
        } else {
            return null
        }
    }


    async getAllProjects(ownerId: string) {
        return await this.projectrepo.getprojects(ownerId)
    }


    async checkIsTheProjectExist(projectname: string, ownerId: string) {
        return await this.projectrepo.IsProjectNameExist(ownerId, projectname)
    }



    async DeleteProject(projectId: string) {
        return await this.projectrepo.deleteProject(projectId)
    }

    async editProject(projectId: string, projectData: Project) {
        return await this.projectrepo.editProject(projectId, projectData)
    }

}