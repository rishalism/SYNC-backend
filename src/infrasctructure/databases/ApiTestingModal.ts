import mongoose, { Schema } from "mongoose";
import ApiToolInterface from "../../domain/ApiToolInterface";


const ApiTestingSchema: Schema = new Schema<ApiToolInterface>({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Projects'
    },
    url: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        required: true
    },
    body: {
        type: Schema.Types.Mixed, // Allows for flexibility in the type of data stored
        default: null
    }

}, { timestamps: true });

const ApiTestingModal = mongoose.model('ApiTestingModal', ApiTestingSchema)

export default ApiTestingModal