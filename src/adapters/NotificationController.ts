import { brotliDecompress } from "zlib";
import { INotification } from "../domain/NotificationInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import NotificationUsecase from "../use_case/NotifcationUsecase";

export default class NotificationController {
    constructor(
        private notificatioonusecase: NotificationUsecase
    ) { }

    async SaveNotification(req: Req, res: Res, next: Next) {
        try {
            const { projectId, userId, notifications, time }: INotification = req.body
            const notification = await this.notificatioonusecase.SaveNotifications({ projectId, userId, notifications, time })
            if (notification) {
                res.status(httpStatus.OK).json('notiifcation saved')
            }
        } catch (error) {
            next(error)
        }
    }



    async getNotifications(req: Req | any, res: Res, next: Next) {
        try {
            const { projectId } = req.params
            const userId = req.user
            const notifications = await this.notificatioonusecase.getNotifications(projectId, userId)
            if (notifications) {
                res.status(httpStatus.OK).json(notifications)
            }
        } catch (error) {
            next(error)
        }
    }




    async clearAllNotifications(req: Req | any, res: Res, next: Next) {
        try {
            const { projectId } = req.body
            const userId = req.user
            console.log(req.body);
            console.log(userId);
            const notifications = await this.notificatioonusecase.ClearNotifications(projectId, userId)
            if (notifications) {
                res.status(httpStatus.OK).json('notiifcation cleared')
            }
        } catch (error) {
            next(error)
        }
    }

}