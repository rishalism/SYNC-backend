import { resourceUsage } from "process";
import { INotification } from "../../domain/NotificationInterface";
import NotificationModal from "../databases/NotificationModal";


export default class NotificationRepo {

    constructor(

    ) { }

    async SaveNotificationInDb(notificationDetails: INotification) {
        const saved = await NotificationModal.findOneAndUpdate(
            { projectId: notificationDetails.projectId, userId: notificationDetails.userId },
            {
                $set: {
                    projectId: notificationDetails.projectId,
                    userId: notificationDetails.userId,
                },
                $push: { notifications: notificationDetails.notifications }
            },
            { upsert: true, new: true }
        );
        return saved

    }

    async getNotificationFromDb(projectId: string, userId: string) {
        const notiifications = await NotificationModal.findOne({ projectId: projectId, userId: userId })
        return notiifications
    }

    async Clearallnotificatins(projectId: string, userId: string) {
        return await NotificationModal.findOneAndDelete({ projectId: projectId, userId: userId })
    }


}