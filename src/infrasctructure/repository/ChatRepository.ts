import { IChat, IMessage } from "../../domain/ChatInterface";
import ChatModal from "../databases/ChatModal";
import MessageModal from "../databases/MessageModal";




export default class ChatRepository {
    constructor(

    ) { }


    async SaveMessage(messageDetails: IMessage) {
        const message = await new MessageModal(messageDetails)
        return await message.save()
    }

    
    async SaveChatInDB(chatDetails: IChat) {
        const chat = await ChatModal.findOneAndUpdate(
            { projectId: chatDetails.projectId },  // Match the document by projectId
            {
                $push: { messages: { $each: chatDetails.messages } }  // Push each message into the messages array
            },
            {
                upsert: true,   // Create the document if it doesn't exist
                new: true       // Return the updated document
            }
        );
        return chat;
    }


    async GetChatByProjectId(projectId: string) {
        return await ChatModal.findOne({ projectId })
    }

}