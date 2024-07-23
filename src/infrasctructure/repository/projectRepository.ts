import { Project } from "../../domain/ProjectInterface";
import ProjectModel from "../databases/ProjectModal";



export default class projectRepository {

    async SaveNewProject(projectdetails: Project) {
        const newproject = await new ProjectModel(projectdetails)
        return await newproject.save()
    }


    async getprojects(ownerId: string) {
        const projects = await ProjectModel.find({ projectOwner: ownerId })
        if (projects) {
            return projects
        }
    }


    async IsProjectNameExist(projectname: string, ownerId: string): Promise<Project | null> {
        return await ProjectModel.findOne({ projectOwner: ownerId, projectName: projectname })
    }


    async deleteProject(projectid: string) {

        return await ProjectModel.findByIdAndDelete(projectid)
    }

    async editProject(projectId: string, projectdata: Project) {
        return await ProjectModel.findByIdAndUpdate(
            projectId,
            {
                projectName: projectdata.projectName,
                projectOwner: projectdata.projectOwner,
                description: projectdata.description
            },
            { new: true }
        );
    }

}