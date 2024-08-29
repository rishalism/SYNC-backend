import express from 'express'
import commonUserAuth from '../middlewares/CommonAuth'
import DbdesignController from '../../adapters/DbDesignController'
import DbDesignRepository from '../repository/DbDesignRepository'
import DbDesignUsecase from '../../use_case/DbDesignUsecase'
const route = express()

const dbdesignrepository = new DbDesignRepository()
const dbdesignusecase = new DbDesignUsecase(dbdesignrepository)
const dbdesigncontroller = new DbdesignController(dbdesignusecase)

route.post('/Dbdesign/save', commonUserAuth, (req, res, next) => dbdesigncontroller.SaveDbDesign(req, res, next))
route.get('/dbDesign/get/:projectId', commonUserAuth, (req, res, next) => dbdesigncontroller.GetDbdesign(req, res, next))

export default route