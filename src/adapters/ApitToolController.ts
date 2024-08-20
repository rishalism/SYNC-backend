import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import ApiToolUseCase from "../use_case/ApiToolUsecase";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import ApiToolInterface from "../domain/ApiToolInterface";
import { json } from "stream/consumers";







export default class ApiToolController {
    constructor(
        private apiUsecase: ApiToolUseCase
    ) { }




    async sendTotargetApi(req: Req, res: Res, next: Next) {
        try {
            const { url, method, body, queryParams, headers } = req.body
            const reponse = await this.apiUsecase.sendApiToTarget({ method, url, body, queryParams, headers })
            res.status(httpStatus.OK).json(reponse)
        } catch (error) {
            next(error)
        }
    }




    async saveTestedApi(req: Req, res: Res, next: Next) {
        try {
            const { projectId, url, method, body }: ApiToolInterface = req.body

            // check if the same url and method is already saved 
            if (projectId) {
                const isSameUrlAndMethod = await this.apiUsecase.checkIfIsSame(projectId, method, url)
                if (isSameUrlAndMethod) {
                    res.status(httpStatus.CONFLICT).json("This API has already been saved.")
                } else {
                    const response = await this.apiUsecase.saveDetailsInDb({ projectId, url, method, body })
                    if (response) {
                        res.status(httpStatus.CREATED).json('stored in database')
                    }
                }

            } else {
                res.status(httpStatus.CONFLICT).json('please select an project')
            }

        } catch (error) {
            next(error)
        }
    }



    async getallSavedAPis(req: Req, res: Res, next: Next) {
        const projectId = req.params.projectId
        try {
            const response = await this.apiUsecase.getAllStoredApis(projectId)
            if (response) {
                res.status(httpStatus.OK).json(response)
            }

        } catch (error) {
            next(error)
        }
    }

    async RemovSavedApi(req: Req, res: Res, next: Next) {
        const { id, projectId } = req.body
        try {

            const response = await this.apiUsecase.RemoveStoredApi(projectId, id)
            if (response) {
                res.status(httpStatus.OK).json('removed')
            }
        } catch (error) {

        }
    }

}



