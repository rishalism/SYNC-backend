import { IinviteMembers } from "../domain/InviteInterface";
import InviteMembersRepository from "../infrasctructure/repository/inviteMembersRepository";
import Encrypt from "../infrasctructure/services/encryption";

export default class InvitationUsecase {

    constructor(
        private inviterepo: InviteMembersRepository,
        private encrypt: Encrypt
    ) { }


    async findInvitationToken(projectId: string): Promise<IinviteMembers | null> {
        const data = await this.inviterepo.findtoken(projectId)
        if (data) {
            return data
        } else {
            return null
        }
    }


    async checkTheTokenMatches(token: string, tokenIndb: string): Promise<boolean> {
        //compare 
        const data = await this.encrypt.compare(token, tokenIndb)
        return data
    }


    async DeleteToken(token: string){
        return this.inviterepo.deleteToken(token)
    }


}