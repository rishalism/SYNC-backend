import { IinviteMembers } from "../../domain/InviteInterface";
import inviteModal from "../databases/InviteModal";







export default class InviteMembersRepository {
    constructor(

    ) { }


    async saveInviteToken(inviteDetails: IinviteMembers) {
        const saveToken = await new inviteModal(inviteDetails)
        return saveToken.save()
    }

    async findtoken(projectId: string): Promise<IinviteMembers | null> {
        const checktoken = await inviteModal.findOne({ projectId: projectId }) as IinviteMembers | null;

        if (checktoken) {
            return checktoken;
        } else {
            return null;
        }
    }
    async deleteToken(token: string) {
        return await inviteModal.findOneAndDelete({ token: token })
    }



}