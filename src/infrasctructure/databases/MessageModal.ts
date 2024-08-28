import mongoose, { Model, Schema } from "mongoose";
import { IMessage } from "../../domain/ChatInterface";

export const MessageSchema: Schema = new Schema({
    id: {
        type: String,
        required: true
    },
    sender: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        }
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d'
    }
});

const MessageModal: Model<IMessage & Document> = mongoose.model<IMessage & Document>('messages', MessageSchema)
export default MessageModal