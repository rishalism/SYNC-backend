import { TeamMember } from "../../domain/TeamMemberInterface";
import IteamMember from "../../use_case/interfaces/IteamMember";
import TeamMemberModel from "../databases/TeamMemberModel";




export default class TeamMemberRepository implements IteamMember {

    constructor(

    ) { }

    async findbyemail(email: string): Promise<TeamMember | null> {
        const TeamMemberDetails = await TeamMemberModel.findOne({ email: email })
        return TeamMemberDetails
    }

    async saveMembers(memberdetails: TeamMember): Promise<TeamMember | null> {
        const memberData = await new TeamMemberModel(memberdetails)
        return await memberData.save()
    }

 
}