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
import InvitationUsecase from '../../use_case/InvitationUsecase'
import InviteMembersRepository from '../repository/inviteMembersRepository'
const route = express()
const teammeberRepo = new TeamMemberRepository()
const otpRepo = new OtpRepository()
const encrypt = new Encrypt()
const jwt = new Jwt()
const sendmails = new sendEmail()
const generateotp = new GenerateOtp()
const invitationRepo = new InviteMembersRepository()
const invitationUsecase = new InvitationUsecase(invitationRepo, encrypt)
const otpusecase = new OtpUseCase(encrypt, otpRepo)
const teammeberusecase = new TeamMemberUsecase(teammeberRepo, encrypt)
const teammembercontroller = new TeamMemberController(teammeberusecase, otpusecase, sendmails, jwt, generateotp, invitationUsecase)

// auth //
route.post('/signup', (req, res, next) => teammembercontroller.MemberSignup(req, res, next))
route.post('/signup-verify', (req, res, next) => teammembercontroller.verifyOtpAndSaveMember(req, res, next))
route.post('/login', (req, res, next) => teammembercontroller.Login(req, res, next))
route.post('/auth/google/login', (req, res, next) => teammembercontroller.googleSignin(req, res, next))
route.post('/auth/google/signup', (req, res, next) => teammembercontroller.googleSignup(req, res, next))
route.post('/accept-invitation', (req, res, next) => teammembercontroller.acceptInvitation(req, res, next))
route.post('/forgot-password', (req, res, next) => teammembercontroller.forgotPassword(req, res, next))
route.post('/forgot-password/otp', (req, res, next) => teammembercontroller.SendResetPasswordOtp(req, res, next))
route.post('/forgot-password/reset-password', (req, res, next) => teammembercontroller.ResetPassword(req, res, next))



export default route