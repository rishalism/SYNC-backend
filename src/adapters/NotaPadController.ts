import { NotePadInterface } from "../domain/NotePadInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import Gemini from "../infrasctructure/services/gemini";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import NotePadUsecase from "../use_case/NotePadUsecase";




export default class NotePadController {

    constructor(
        private notepadusecase: NotePadUsecase,
        private gemini: Gemini
    ) { }


    async CreateNewNote(req: Req | any, res: Res, next: Next) {
        try {

            const { title, notes, is_visible, projectId } = req.body
            const user_id = req.user
            // check if the title already exist in database 
            const isExist = await this.notepadusecase.checkIfThetitleAlreadyExist(title)
            if (isExist) {
                res.status(httpStatus.BAD_REQUEST).json("title already exist")
            } else {
                // save it in the database 
                const isSaved = await this.notepadusecase.CreateNewNote({ title, projectId, user_id, is_visible, notes })
                if (isSaved) res.status(httpStatus.OK).json(isSaved)
            }

        } catch (error) {
            next(error)
        }
    }


    async GetNotes(req: Req | any, res: Res, next: Next) {
        try {
            const projectId = req.params.projectId
            const user_id = req.user
            if (projectId && user_id) {
                const notes = await this.notepadusecase.GetNotes(projectId, user_id)
                if (notes) {
                    res.status(httpStatus.OK).json(notes)
                }
            } else {
                res.status(httpStatus.BAD_REQUEST).json("please select a project ")
            }
        } catch (error) {
            next(error)
        }
    }

    async UpdateNote(req: Req | any, res: Res, next: Next) {
        try {
            const { title, _id, notes, is_visible, projectId } = req.body
            const user_id = req.user
            const isSaved = await this.notepadusecase.UpdateNote({ _id, title, projectId, user_id, is_visible, notes })
            if (isSaved) res.status(httpStatus.OK).json('note is updated')

        } catch (error) {
            next(error)

        }
    }



    async DeleteNote(req: Req, res: Res, next: Next) {
        try {
            const { id } = req.body
            // delete the note 
            const isDeleted = await this.notepadusecase.DeleteNote(id)
            if (isDeleted) {
                res.status(httpStatus.OK).json('note deleted')
            }
        } catch (error) {
            next(error)

        }
    }


    async AskAi(req: Req, res: Res, next: Next) {
        try {
            const { prompt } = req.body
            const result =  await this.gemini.GenerateText(prompt)
            if (result) {
                console.log(prompt);
                console.log(result);
                res.status(httpStatus.OK).json(result)
            } else {
                res.status(httpStatus.EXPECTATION_FAILED).json('sorry we are facing heavy traffic . please wait !')
            }
        } catch (error) {
            next(error)
        }
    }

}