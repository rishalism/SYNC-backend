import { TeamMember } from "../domain/TeamMemberInterface";
import TeamMemberRepository from "../infrasctructure/repository/teamMemberRepository";
import Encrypt from "../infrasctructure/services/encryption";



export default class TeamMemberUsecase {
    constructor(
        private teammemberRepo: TeamMemberRepository,
        private encrypt: Encrypt
    ) { }

    async checkIfEmailExist(email: string) {
        return await this.teammemberRepo.findbyemail(email)
    }


    async getTeamMemberDetails(email: string) {
        return await this.teammemberRepo.findbyemail(email)
    }

    async isPasswordMatching(password: string, DbPassword: string) {
        return await this.encrypt.compare(password, DbPassword)
    }


    async saveTeamMember(teamMemberDetails: TeamMember) {
        if (teamMemberDetails) {
            return await this.teammemberRepo.saveMembers(teamMemberDetails)
        } else {
            return null
        }
    }

    async UpdatePassword(email: string, password: string) {
        const hashedPassword = await this.encrypt.hashpassord(password)
        return await this.teammemberRepo.UpdatePasswordByEmail(email, hashedPassword)
    }


}