import express from 'express'
import ProjectLeadController from '../../adapters/ProjectLeadController'

import GenerateOtp from '../services/generateOtp'
import Encrypt from '../services/encryption'
import OtpUseCase from '../../use_case/otpUsecase'
import ProjectLeadUseCase from '../../use_case/projectLeadUsecase'
import ProjectLeadRepository from '../repository/projectLeadRespository'
import sendEmail from '../services/sendEmail'
import OtpRepository from '../repository/otpRepository'
import Jwt from '../services/jwt'
import ProjectController from '../../adapters/ProjectsController'
import ProjectUseCase from '../../use_case/ProjectUseCase'
import projectRepository from '../repository/projectRepository'
import projectLeadAuth from '../middlewares/ProjectLeadAuth'

// creating instances  and injecting dependencies :>
const projectLeadRepo = new ProjectLeadRepository()
const sendemails = new sendEmail()
const generateOtp = new GenerateOtp()
const encrypt = new Encrypt()
const otpRepo = new OtpRepository()
const jwt = new Jwt()

/////////////// project-controller ///////////////////////// 

const otpusecase = new OtpUseCase(encrypt, otpRepo)
const projectleadusecase = new ProjectLeadUseCase(projectLeadRepo, encrypt)
const projectleadcontroller = new ProjectLeadController(
    generateOtp,
    projectleadusecase,
    sendemails,
    otpusecase,
    jwt
)

//////////////////// projects //////////////////////////

const projectrepo = new projectRepository()
const projectusecase = new ProjectUseCase(projectrepo)
const projectcontroller = new ProjectController(
    projectusecase
)

const route = express.Router()
//auth//
route.post('/signup', (req, res, next) => projectleadcontroller.Signup(req, res, next))
route.post('/signup-verify', (req, res, next) => projectleadcontroller.verifyOtpAndSaveUser(req, res, next))
route.post('/login', (req, res, next) => projectleadcontroller.Login(req, res, next))


//projects//
route.post('/projects', projectLeadAuth, (req, res, next) => projectcontroller.createProject(req, res, next))
route.get('/projects', projectLeadAuth, (req, res, next) => projectcontroller.getProjects(req, res, next))



export default route