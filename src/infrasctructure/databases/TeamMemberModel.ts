import mongoose, { Document, Schema } from "mongoose";
import { accessLevel, TeamMember } from "../../domain/TeamMemberInterface";

const TeamMemberSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    permissions: {
        dbDesign: { type: Number, enum: [accessLevel.view, accessLevel.edit], default: accessLevel.view },
        modules: { type: Number, enum: [accessLevel.view, accessLevel.edit], default: accessLevel.view },
        board: { type: Number, enum: [accessLevel.view, accessLevel.edit], default: accessLevel.view }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const TeamMemberModel = mongoose.model<TeamMember & Document>('TeamMember', TeamMemberSchema);

export default TeamMemberModel;
