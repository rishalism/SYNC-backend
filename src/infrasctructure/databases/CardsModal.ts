import mongoose, { Document, Model, Schema } from "mongoose";
import { CardInterface } from "../../domain/CardsInterface";
import { ObjectId } from "mongodb";




const CardSchema = new Schema<CardInterface & Document>({
    id: {
        type: String,
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Projects'
    },
    title: {
        type: String,
        required: true
    },
    column: {
        type: String,
        required: true
    },
    data: [
        {
            task: {
                type: String,
            },
            assignedMembers: {
                type: [Schema.Types.ObjectId],
                ref: 'TeamMember',
            }
        }
    ],
    TotalassignedMembers: {
        type: [Schema.Types.ObjectId],
        ref: 'TeamMember',
    }
},
    { timestamps: true });


const CardModal: Model<CardInterface & Document> = mongoose.model<CardInterface & Document>('Cards', CardSchema)
export default CardModal