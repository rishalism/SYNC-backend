import { v4 as uuidv4 } from 'uuid';
import InviteMembersRepository from '../repository/inviteMembersRepository';
import { ObjectId } from 'mongoose';
import Encrypt from './encryption';


export default class GenerateLink {
    constructor(
        private inviteRepo: InviteMembersRepository,
        private encrypt: Encrypt
    ) { }



    async genereteUniqueLink(projectId: ObjectId, projectOwner: string) {
        const key = uuidv4()
        const baseUrl = process.env.CORS_URL;
        const url = `${baseUrl}/api/v1/links/?token=${key}`
        const token: string = await this.encrypt.hashpassord(key)
        await this.inviteRepo.saveInviteToken({ token, projectId, projectOwner })
        return url
    }



}