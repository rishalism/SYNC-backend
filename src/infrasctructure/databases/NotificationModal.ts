import mongoose, { Document, Model, Schema } from "mongoose";
import { INotification } from "../../domain/NotificationInterface";




const NotificationSchema = new Schema<INotification & Document>({
    projectId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    notifications: [{
        message: {
            type: String,
            required: true

        },
        time: {
            type: Date,
            required: true
        }
    }
    ],

})


const NotificationModal: Model<INotification & Document> = mongoose.model<INotification & Document>('notifications', NotificationSchema)
export default NotificationModal