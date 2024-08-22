import { ProjectLead } from "../domain/ProjectLeadInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import Encrypt from "../infrasctructure/services/encryption";
import IprojectLeadRepository from "./interfaces/IprojectLead";


export default class ProjectLeadUseCase {

    constructor(
        private projectLeadRepo: IprojectLeadRepository,
        private encrypt: Encrypt
    ) {

    }
    async checkEmailExist(email: string) {
        const projectleadExist = await this.projectLeadRepo.findByEmail(email)
        return {
            status: httpStatus.CONFLICT,
            data: projectleadExist
        }
    }


    async saveProjectLead(projectLeadDetails: ProjectLead) {
        const projectLead = await this.projectLeadRepo.saveprojectLeadInDb(projectLeadDetails)
        return projectLead
    }


    async IsPasswordMatching(password: string, passwordInDb: string): Promise<boolean> {
        const data = await this.encrypt.compare(password, passwordInDb)
        return data
    }

    async GetProjectLeadDetails(email: string) {
        return await this.projectLeadRepo.projectDetailInfo(email)
    }


    async UpdatePassword(email: string, password: string) {
        const hashedPassword = await this.encrypt.hashpassord(password)
        return await this.projectLeadRepo.updatePasswordByEmail(email, hashedPassword)
    }


}