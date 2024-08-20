import { CardInterface } from "../domain/CardsInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import CardUseCase from "../use_case/CardUsecase";





export default class CardController {

    constructor(
        private cardusecase: CardUseCase
    ) { }

    async AddCard(req: Req, res: Res, next: Next) {
        try {
            const { id, column, projectId, title }: CardInterface = req.body
            // save in to databse 
            const saved = await this.cardusecase.saveCardinDatabase({ id, column, projectId, title })
            if (saved) {
                console.log(saved);
                res.status(httpStatus.OK).json('card has been saves in Db')
            }
        } catch (error) {
            next(error)
        }
    }


    async GetCards(req: Req, res: Res, next: Next) {
        try {
            // get all cards by the project id 
            const projectId = req.params.projectId
            const data = await this.cardusecase.GetCardsByProjectId(projectId)
            if (data) {
                res.status(httpStatus.OK).json(data)
            }
        } catch (error) {

        }
    }


    async Updatecard(req: Req, res: Res, next: Next) {
        try {
            const { _id, column, } = req.body
            // update the colum by id 
            const updatedCard = await this.cardusecase.UpdateCoulumn(_id, column)
            if (updatedCard) {
                res.status(httpStatus.OK).json(updatedCard)
            }
        } catch (error) {
            next(error)
        }
    }



    async AddtaskAndAssignMembers(req: Req, res: Res, next: Next) {
        try {
            const { inputValue, assignedMemberIds, id } = req.body
            // update by id and update task
            console.log(req.body);

            const updatedCard = await this.cardusecase.assigntask(id, inputValue, assignedMemberIds)
            if (updatedCard) {
                res.status(httpStatus.OK).json()
            }
        } catch (error) {
            next(error)
        }
    }



    async GetCardById(req: Req, res: Res, next: Next) {
        try {
            const id = req.params.id
            const cardData = await this.cardusecase.getcardByCardId(id)
            if (cardData) {
                res.status(httpStatus.OK).json(cardData)
            }
        } catch (error) {
            next(error)
        }
    }


    async DeleteCard(req: Req, res: Res, next: Next) {
        try {
            const { _id } = req.body
            // delete card 
            const isCardDeleted = await this.cardusecase.DeletCard(_id)
            if (isCardDeleted) {
                res.status(httpStatus.OK).json('card deleted')
            }
        } catch (error) {

        }
    }

    async TaskDelete(req: Req, res: Res, next: Next) {
        try {
            const { taskId, id } = req.body
            // delete task 
            const isTaskDeleted = await this.cardusecase.DeleteTask(taskId, id)
            if (isTaskDeleted) {
                res.status(httpStatus.OK).json('task deleted');
            }
        } catch (error) {
            next(error)
        }
    }

}