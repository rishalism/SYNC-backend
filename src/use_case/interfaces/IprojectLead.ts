import { ProjectLead } from "../../domain/ProjectLeadInterface";


export default interface IprojectLeadRepository {
    findByEmail(email: string): Promise<ProjectLead | null>
    saveprojectLeadInDb({ name, username, email, password, role }: ProjectLead): Promise<ProjectLead>
    projectDetailInfo(email: string): Promise<ProjectLead | null>
    updatePasswordByEmail(email: string, password: string): Promise<ProjectLead | null>
}

