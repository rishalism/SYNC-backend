import { ObjectId } from "mongoose";
import { Project } from "../domain/ProjectInterface";
import projectRepository from "../infrasctructure/repository/projectRepository";
import { accessLevel } from "../domain/TeamMemberInterface";




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



    async getAllProjects(memberId: string) {
        return await this.projectrepo.getprojects(memberId)
    }

    async getCurrentProject(projectId: string) {
        return await this.projectrepo.getCurrentProject(projectId)
    }

    async getALLProjectsOfTeamMember(ownerId: string) {
        return await this.projectrepo.getTeamMemberProjects(ownerId)
    }


    async checkIsTheProjectExist(projectname: string, ownerId: string) {
        return await this.projectrepo.IsProjectNameExist(ownerId, projectname)
    }


    async checktheMemberExist(projectId: string, memberId: ObjectId) {
        return await this.projectrepo.isMemberIsAlreadyExist(projectId, memberId)
    }

    async DeleteProject(projectId: string) {
        return await this.projectrepo.deleteProject(projectId)
    }

    async editProject(projectId: string, projectData: Project) {
        return await this.projectrepo.editProject(projectId, projectData)
    }

    async addMember(projectId: string, memberId: ObjectId) {
        return await this.projectrepo.addMemberToProject(projectId, memberId)
    }

    async removeMemberFromProject(projectId: string, memberId: ObjectId) {
        return await this.projectrepo.removeMemberFromProject(projectId, memberId)
    }


    async UpdatePemissions(projectId: string, userId: string, permissionType: string, access: accessLevel) {
        return await this.projectrepo.UpdateMemberPermission(projectId, userId, permissionType, access)
    }

}