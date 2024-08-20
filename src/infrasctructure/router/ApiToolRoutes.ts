import express from 'express'
import ApiToolController from '../../adapters/ApitToolController'
import ApiToolUseCase from '../../use_case/ApiToolUsecase'
import ApiRepository from '../repository/ApiRepository'
import commonUserAuth from '../middlewares/CommonAuth'

const apitoolrepo = new ApiRepository()
const apitoolusecase = new ApiToolUseCase(apitoolrepo)
const apitoolcontroller = new ApiToolController(apitoolusecase)

const route = express()


route.post('/api/test', commonUserAuth, (req, res, next) => apitoolcontroller.sendTotargetApi(req, res, next))
route.post('/save', commonUserAuth, (req, res, next) => apitoolcontroller.saveTestedApi(req, res, next))
route.post('/tests/:projectId', commonUserAuth, (req, res, next) => apitoolcontroller.getallSavedAPis(req, res, next))
route.post('/delete', commonUserAuth, (req, res, next) => apitoolcontroller.RemovSavedApi(req, res, next))




export default route