import { INotification } from "../domain/NotificationInterface";
import NotificationRepo from "../infrasctructure/repository/NotificationRepo";






export default class NotificationUsecase {
    constructor(
        private notificationrepo: NotificationRepo
    ) { }

    async SaveNotifications(notificationDetails: INotification) {
        return await this.notificationrepo.SaveNotificationInDb(notificationDetails)
    }


    async getNotifications(projectId: string, userId: string) {
        return await this.notificationrepo.getNotificationFromDb(projectId, userId)
    }

    async ClearNotifications(projectId: string, userId: string) {
        return await this.notificationrepo.Clearallnotificatins(projectId, userId)
    }

}