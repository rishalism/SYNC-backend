import mongoose, { Document, Model, Schema } from "mongoose";
import { ProjectLead } from "../../domain/ProjectLeadInterface";



const ProjectLeadSchema = new Schema<ProjectLead & Document>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
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
    isGoogle: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const ProjectLeadModel: Model<ProjectLead & Document> = mongoose.model<ProjectLead & Document>('ProjectLead', ProjectLeadSchema)

export default ProjectLeadModel