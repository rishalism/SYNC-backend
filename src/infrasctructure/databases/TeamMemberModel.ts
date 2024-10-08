import mongoose, { Document, Schema } from "mongoose";
import { accessLevel, isBlocked, TeamMember } from "../../domain/TeamMemberInterface";

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
    isGoogle: {
        type: Boolean,
        required: true
    },
    permissions: {
        dbDesign: { type: Number, enum: [accessLevel.allow, accessLevel.restrict], default: accessLevel.allow },
        notepad: { type: Number, enum: [accessLevel.allow, accessLevel.restrict], default: accessLevel.restrict },
        board: { type: Number, enum: [accessLevel.allow, accessLevel.restrict], default: accessLevel.restrict }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const TeamMemberModel = mongoose.model<TeamMember & Document>('TeamMember', TeamMemberSchema);

export default TeamMemberModel;
