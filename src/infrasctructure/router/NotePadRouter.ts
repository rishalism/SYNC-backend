import express from 'express'
import NotePadController from '../../adapters/NotaPadController'
import NotePadUsecase from '../../use_case/NotePadUsecase'
import NotePadRepository from '../repository/NotePadRepository'
import commonUserAuth from '../middlewares/CommonAuth'
import Gemini from '../services/gemini'

const route = express()



const notepadrepo = new NotePadRepository()
const notepadusecase = new NotePadUsecase(notepadrepo)
const gemini = new Gemini()
const notepadcontroller = new NotePadController(notepadusecase, gemini)

route.post('/note/create', commonUserAuth, (req, res, next) => notepadcontroller.CreateNewNote(req, res, next))
route.get('/note/get/:projectId', commonUserAuth, (req, res, next) => notepadcontroller.GetNotes(req, res, next))
route.post('/note/update', commonUserAuth, (req, res, next) => notepadcontroller.UpdateNote(req, res, next))
route.post('/note/delete', commonUserAuth, (req, res, next) => notepadcontroller.DeleteNote(req, res, next))
route.post('/note/ai', (req, res, next) => notepadcontroller.AskAi(req, res, next))







export default route