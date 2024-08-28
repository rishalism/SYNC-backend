import express from 'express'
import commonUserAuth from '../middlewares/CommonAuth'
import NotificationController from '../../adapters/NotificationController'
import NotificationUsecase from '../../use_case/NotifcationUsecase'
import NotificationRepo from '../repository/NotificationRepo'
const route = express()





const notificationrepo = new NotificationRepo()
const notificationusecase = new NotificationUsecase(notificationrepo)
const notificationcontroller = new NotificationController(notificationusecase)


route.post('/notification/save', commonUserAuth, (req, res, next) => notificationcontroller.SaveNotification(req, res, next))
route.get('/notification/:projectId', commonUserAuth, (req, res, next) => notificationcontroller.getNotifications(req, res, next))
route.post('/notifications/clear', commonUserAuth, (req, res, next) => notificationcontroller.clearAllNotifications(req, res, next))

export default route