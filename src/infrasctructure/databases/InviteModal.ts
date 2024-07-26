import mongoose, { Schema, } from "mongoose";
import { IinviteMembers } from "../../domain/InviteInterface";



const InviteSchema: Schema = new Schema<IinviteMembers>({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Projects'
    },
    projectOwner: {
        type: String,
        required: true,
        ref: 'Projects'
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })


const inviteModal = mongoose.model('inviteMembers', InviteSchema)
export default inviteModal