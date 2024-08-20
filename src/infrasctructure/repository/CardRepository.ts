import { CardInterface, Icolumn } from "../../domain/CardsInterface";
import CardModal from "../databases/CardsModal";



export default class CardRepository {
    constructor(

    ) { }

    async createNewCard(NewCard: CardInterface) {
        const newCard = await new CardModal(NewCard)
        return await newCard.save()
    }


    async CardByproject(projectId: string) {
        const cards = await CardModal.find({ projectId: projectId }).exec();
        return cards
    }


    async findbyIdAndupdate(id: string, column: Icolumn) {
        return await CardModal.findByIdAndUpdate(id, { column: column })
    }


    async assigntasktomembers(id: string, task: string, assignedMembers: string[]) {

        return await CardModal.findByIdAndUpdate(
            id,
            {
                $push: {
                    data: {
                        task: task,
                        assignedMembers: assignedMembers
                    }
                },
                $addToSet: {
                    TotalassignedMembers: { $each: assignedMembers }
                }
            },
            { new: true, runValidators: true }
        )
    }


    async getOneCardById(id: string) {
        const data = await CardModal.findById(id)
        return data
    }


    async DeleteById(id: string) {
        return await CardModal.findByIdAndDelete(id)
    }


    async DeleteTaskById(taskId: string, id: string) {
        const result = await CardModal.findByIdAndUpdate(
            id,
            { $pull: { data: { _id: taskId } } },
            { new: true }
        )
        return result
    }

}