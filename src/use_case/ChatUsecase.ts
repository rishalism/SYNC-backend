import { IChat, IMessage } from "../domain/ChatInterface";
import ChatRepository from "../infrasctructure/repository/ChatRepository";


export default class ChatUseCase {
    constructor(
        private chatRepo: ChatRepository
    ) { }


    async saveMessage(messageDetails: IMessage) {
        return await this.chatRepo.SaveMessage(messageDetails)
    }

    async saveChats(chatDetails: IChat) {
        return await this.chatRepo.SaveChatInDB(chatDetails);
    }
    

    async Getchats(projectId: string) {
        return await this.chatRepo.GetChatByProjectId(projectId)
    }


}