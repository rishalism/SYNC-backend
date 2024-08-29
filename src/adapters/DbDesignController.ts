import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import DbDesignUsecase from "../use_case/DbDesignUsecase";




export default class DbdesignController {

    constructor(
        private dbdesignusecase: DbDesignUsecase
    ) { }

    async SaveDbDesign(req: Req, res: Res, next: Next) {
        const { dbdesignData } = req.body
        /// save db design 
        try {
            const saved = await this.dbdesignusecase.saveDbDesign(dbdesignData)
            if (saved) {
                console.log(saved);
                res.status(httpStatus.OK).json('saved in database')
            } else {
                res.status(httpStatus.CONFLICT).json('failed to  save in database . please try again later')
            }
        } catch (error) {
            next(error)
        }
    }


    async GetDbdesign(req: Req, res: Res, next: Next) {
        // get db designs
        const { projectId } = req.params
        try {
            const dbDesignData = await this.dbdesignusecase.getdbdesignByProjectId(projectId)
            if (dbDesignData) {
                res.status(httpStatus.OK).json(dbDesignData)
            } else {
                res.status(httpStatus.CONFLICT).json('failed to restore from database.. please try again later')
            }
        } catch (error) {
            next(error)
        }

    }


}