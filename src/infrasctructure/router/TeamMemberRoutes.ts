import express from 'express'
import TeamMemberController from '../../adapters/TeamMembersController'
import TeamMemberUsecase from '../../use_case/teamMemberUsecase'
import TeamMemberRepository from '../repository/teamMemberRepository'
import OtpUseCase from '../../use_case/otpUsecase'
import Jwt from '../services/jwt'
import sendEmail from '../services/sendEmail'
import OtpRepository from '../repository/otpRepository'
import Encrypt from '../services/encryption'
import GenerateOtp from '../services/generateOtp'
import TeaMemberAuth from '../middlewares/TeamMemberMiddleware'
const route = express()
const teammeberRepo = new TeamMemberRepository()
const otpRepo = new OtpRepository()
const encrypt = new Encrypt()
const jwt = new Jwt()
const sendmails = new sendEmail()
const generateotp = new GenerateOtp()
const otpusecase = new OtpUseCase(encrypt, otpRepo)
const teammeberusecase = new TeamMemberUsecase(teammeberRepo, encrypt)
const teammembercontroller = new TeamMemberController(teammeberusecase, otpusecase, sendmails, jwt, generateotp)

// auth //
route.post('/signup', (req, res, next) => teammembercontroller.MemberSignup(req, res, next))
route.post('/signup-verify', (req, res, next) => teammembercontroller.verifyOtpAndSaveMember(req, res, next))
route.post('/login', (req, res, next) => teammembercontroller.Login(req, res, next))
route.post('/auth/google/login', (req, res, next) => teammembercontroller.googleSignin(req, res, next))
route.post('/auth/google/signup', (req, res, next) => teammembercontroller.googleSignup(req, res, next))




export default route