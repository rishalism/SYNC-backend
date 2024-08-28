import { ObjectId } from "mongoose";
import { Project } from "../../domain/ProjectInterface";
import ProjectModel from "../databases/ProjectModal";
import TeamMemberModel from "../databases/TeamMemberModel";
import { accessLevel } from "../../domain/TeamMemberInterface";



export default class projectRepository {

    async SaveNewProject(projectdetails: Project) {
        const newproject = await new ProjectModel(projectdetails)
        return await newproject.save()
    }


    async getprojects(ownerId: string) {
        const projects = await ProjectModel.find({ projectOwner: ownerId, isDeleted: false }).populate('projectOwner').populate('ProjectMembers')
        if (projects) {
            return projects
        }
    }

    async getCurrentProject(projectId: string) {
        const projects = await ProjectModel.findById(projectId).populate('projectOwner').populate('ProjectMembers')
        if (projects) {
            return projects
        }
    }


    async getTeamMemberProjects(memberId: string) {
        const projects = await ProjectModel.find({ ProjectMembers: memberId, isDeleted: false }).populate('projectOwner').populate('ProjectMembers')
        if (projects) {
            return projects
        }
    }

    async IsProjectNameExist(projectname: string, ownerId: string): Promise<Project | null> {
        return await ProjectModel.findOne({ projectOwner: ownerId, projectName: projectname, isDeleted: false })
    }


    async deleteProject(projectid: string) {

        return await ProjectModel.findByIdAndUpdate(projectid, { isDeleted: true })
    }

    async editProject(projectId: string, projectdata: Project) {
        return await ProjectModel.findByIdAndUpdate(
            projectId,
            {
                projectName: projectdata.projectName,
                projectOwner: projectdata.projectOwner,
                description: projectdata.description,
                isDeleted: projectdata.isDeleted
            },
            { new: true }
        );
    }



    async isMemberIsAlreadyExist(projectId: string, memberId: ObjectId) {
        const projectData = await ProjectModel.findById(projectId)
        return projectData?.ProjectMembers?.includes(memberId)
    }



    async addMemberToProject(projectId: string, memberId: ObjectId) {
        const added = await ProjectModel.findByIdAndUpdate(projectId, {
            $push: { ProjectMembers: memberId }
        }, { new: true })
        return added
    }


    async removeMemberFromProject(projecId: string, memberId: ObjectId) {
        const removed = await ProjectModel.findByIdAndUpdate(projecId, {
            $pull: { ProjectMembers: memberId }
        }, { new: true })
        return removed
    }


    async UpdateMemberPermission(projectId: string, userId: string, permissionType: string, access: accessLevel) {
        const updatedPermission = await TeamMemberModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    [`permissions.${permissionType}`]: access
                }
            },
            { new: true } // This option returns the modified document
        );
        return updatedPermission;
    }

}