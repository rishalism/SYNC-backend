import { CardInterface, Icolumn } from "../domain/CardsInterface";
import CardRepository from "../infrasctructure/repository/CardRepository";

export default class CardUseCase {
    constructor(
        private cardrepo: CardRepository
    ) { }



    async saveCardinDatabase(cardData: CardInterface) {
        return await this.cardrepo.createNewCard(cardData)
    }


    async GetCardsByProjectId(projectid: string) {
        return await this.cardrepo.CardByproject(projectid)
    }

    async UpdateCoulumn(id: string, coulumn: Icolumn) {
        return await this.cardrepo.findbyIdAndupdate(id, coulumn)
    }


    async assigntask(id: string, task: string, assignedMembers: string[]) {
        return await this.cardrepo.assigntasktomembers(id, task, assignedMembers)
    }

    async getcardByCardId(id: string) {
        return await this.cardrepo.getOneCardById(id)
    }

    async DeletCard(id: string) {
        return await this.cardrepo.DeleteById(id)
    }

    async DeleteTask(taskId: string, id: string) {
        return await this.cardrepo.DeleteTaskById(taskId, id)
    }

}
