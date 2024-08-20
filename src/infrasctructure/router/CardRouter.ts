import express from 'express';
import CardController from '../../adapters/CardController';
import CardRepository from '../repository/CardRepository';
import CardUseCase from '../../use_case/CardUsecase';
import commonUserAuth from '../middlewares/CommonAuth';

const route = express()

const cardrepo = new CardRepository()
const cardusecase = new CardUseCase(cardrepo)
const cardcontroller = new CardController(cardusecase)


route.post('/card/create', commonUserAuth, (req, res, next) => cardcontroller.AddCard(req, res, next))
route.get('/card/get/:projectId', commonUserAuth, (req, res, next) => cardcontroller.GetCards(req, res, next))
route.patch('/card/update', commonUserAuth, (req, res, next) => cardcontroller.Updatecard(req, res, next))
route.patch('/card/add-task', commonUserAuth, (req, res, next) => cardcontroller.AddtaskAndAssignMembers(req, res, next))
route.get('/card/getone/:id', commonUserAuth, (req, res, next) => cardcontroller.GetCardById(req, res, next))
route.put('/card/delete', commonUserAuth, (req, res, next) => cardcontroller.DeleteCard(req, res, next))
route.put('/task/delete', commonUserAuth, (req, res, next) => cardcontroller.TaskDelete(req, res, next))




export default route