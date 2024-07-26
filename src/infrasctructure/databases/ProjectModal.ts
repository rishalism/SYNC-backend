import mongoose, { Document, Model, Schema } from "mongoose";
import { Project } from "../../domain/ProjectInterface";


const projectSchema = new Schema<Project & Document>({
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    projectOwner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    ProjectMembers: {
        type: [Schema.Types.ObjectId],
        ref: 'TeamMember',
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
});


const ProjectModel: Model<Project & Document> = mongoose.model<Project & Document>('Projects', projectSchema)
export default ProjectModel