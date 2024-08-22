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
import projectLeadAuth from '../middlewares/ProjectLeadAuth'
import GenerateLink from '../services/generateLink'
import InviteMembersRepository from '../repository/inviteMembersRepository'


// creating instances  and injecting dependencies :>
const projectLeadRepo = new ProjectLeadRepository()
const sendemails = new sendEmail()
const generateOtp = new GenerateOtp()
const encrypt = new Encrypt()
const otpRepo = new OtpRepository()
const jwt = new Jwt()
const inviteRepo = new InviteMembersRepository()
const generateurl = new GenerateLink(inviteRepo, encrypt)
/////////////// project-controller ///////////////////////// 

const otpusecase = new OtpUseCase(encrypt, otpRepo)
const projectleadusecase = new ProjectLeadUseCase(projectLeadRepo, encrypt)
const projectleadcontroller = new ProjectLeadController(
    generateOtp,
    projectleadusecase,
    sendemails,
    otpusecase,
    jwt,
    generateurl
)



const route = express.Router()
//auth//
route.post('/signup', (req, res, next) => projectleadcontroller.Signup(req, res, next))
route.post('/signup-verify', (req, res, next) => projectleadcontroller.verifyOtpAndSaveUser(req, res, next))
route.post('/login', (req, res, next) => projectleadcontroller.Login(req, res, next))
route.post('/auth/google-signin', (req, res, next) => projectleadcontroller.googleSignin(req, res, next))
route.post('/auth/google-signup', (req, res, next) => projectleadcontroller.googleSignup(req, res, next))
route.post('/invite-member', projectLeadAuth, (req, res, next) => projectleadcontroller.inviteMember(req, res, next))
route.post('/forgot-password', (req, res, next) => projectleadcontroller.forgotPassword(req, res, next))
route.post('/forgot-password/otp', (req, res, next) => projectleadcontroller.verifyResetPassworOTP(req, res, next))
route.post('/forgot/password/reset', (req, res, next) => projectleadcontroller.ResetPassword(req, res, next))



export default route