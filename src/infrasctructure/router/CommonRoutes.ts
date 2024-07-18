import express from 'express'
import CommonController from '../../adapters/CommonContoller'
import GenerateOtp from '../services/generateOtp'
import sendEmail from '../services/sendEmail'
import OtpUseCase from '../../use_case/otpUsecase'
import OtpRepository from '../repository/otpRepository'
import Encrypt from '../services/encryption'
import Jwt from '../services/jwt'
const route = express()



const generateotp = new GenerateOtp()
const sendmails = new sendEmail()
const otpRepo = new OtpRepository()
const encrypt = new Encrypt()
const jwt = new Jwt()
const optusecase = new OtpUseCase(
    encrypt, otpRepo
)

const commoncontroller = new CommonController(
    generateotp,
    sendmails,
    optusecase,
    jwt
)


route.put('/resend', (req, res, next) => commoncontroller.resendOtp(req, res, next))
route.post('/refreshtoken', (req, res, next) => commoncontroller.refreshAccestoken(req, res, next))

export default route