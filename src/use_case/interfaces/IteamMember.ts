import { TeamMember } from "../../domain/TeamMemberInterface";


export default interface IteamMember {
    findbyemail(email: string): Promise<TeamMember | null>
    saveMembers(memberdetails: TeamMember): Promise<TeamMember | null>
}