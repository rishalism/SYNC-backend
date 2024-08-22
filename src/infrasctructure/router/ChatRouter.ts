import express from 'express'
import commonUserAuth from '../middlewares/CommonAuth'
import ChatController from '../../adapters/ChatController'
import ChatRepository from '../repository/ChatRepository'
import ChatUseCase from '../../use_case/ChatUsecase'

const route = express()

const chatrepo = new ChatRepository()
const chatusecase = new ChatUseCase(chatrepo)
const chatcontroller = new ChatController(chatusecase)

route.post('/chat/save', commonUserAuth, (req, res, next) => chatcontroller.SaveChats(req, res, next))
route.get('/chat/get/:projectId', commonUserAuth, (req, res, next) => chatcontroller.GetChats(req, res, next))







export default route