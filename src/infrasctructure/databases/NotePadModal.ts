import mongoose, { Document, Model, Schema } from "mongoose";
import { ISVISIBLE, NotePadInterface } from "../../domain/NotePadInterface";

const NotePadSchema: Schema = new Schema<NotePadInterface & Document>({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true }, // Refers to the project the notepad belongs to
    user_id: { type: Schema.Types.ObjectId, required: true }, // ID of the user who created the note
    title: { type: String, required: true },
    notes: { type: String, required: true }, // Store the HTML content as a single string
    is_visible: { type: String, enum: ISVISIBLE, required: true }, // Controls note visibility
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});



const NotePadModal: Model<NotePadInterface & Document> = mongoose.model<NotePadInterface & Document>('NotePad', NotePadSchema)
export default NotePadModal