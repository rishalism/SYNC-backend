import { IinviteMembers } from "../../domain/InviteInterface";
import inviteModal from "../databases/InviteModal";







export default class InviteMembersRepository {
    constructor(

    ) { }


    async saveInviteToken(inviteDetails: IinviteMembers) {
        const saveToken = await new inviteModal(inviteDetails)
        return saveToken.save()
    }

}