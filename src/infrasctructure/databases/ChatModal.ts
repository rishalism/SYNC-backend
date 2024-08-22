import mongoose, { Document, Model, Schema } from "mongoose";
import { MessageSchema } from "./MessageModal";
import { IChat } from "../../domain/ChatInterface";


const ChatSchema: Schema = new Schema<IChat>({
    projectId: {
        type: String,
        required: true,
        ref: "Projects"
    },
    messages: {
        type: [MessageSchema]
    }
});


const ChatModal: Model<IChat & Document> =  mongoose.model<IChat & Document>('chats', ChatSchema)
export default ChatModal