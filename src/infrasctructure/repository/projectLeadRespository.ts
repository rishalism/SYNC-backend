import ProjectLeadModel from "../databases/ProjectLeadModel";
import { ProjectLead } from "../../domain/ProjectLeadInterface";
import IprojectLeadRepository from "../../use_case/interfaces/IprojectLead";

export default class ProjectLeadRepository implements IprojectLeadRepository {

    async findByEmail(email: string): Promise<ProjectLead | null> {
        const findUser = await ProjectLeadModel.findOne({ email: email })
        return findUser
    }


    async saveprojectLeadInDb(projectLeadDetails: ProjectLead): Promise<ProjectLead> {
        const projectLead = new ProjectLeadModel(projectLeadDetails)
        const saved = await projectLead.save()
        return saved
    }

    async projectDetailInfo(email: string): Promise<ProjectLead | null> {
        const projectLeadData = await ProjectLeadModel.findOne({ email: email })
        return projectLeadData
    }

}