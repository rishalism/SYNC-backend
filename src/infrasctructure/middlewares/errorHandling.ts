import { httpStatus } from "../constants/httpStatus";
import { Next, Req, Res } from "../types/expressTypes";



export default function errorHandleMiddleware(err: any, req: Req, res: Res, next: Next,) {
    console.log(err, '--------------------from errorHandleMiddleware----------------------------');

    if (err.name === 'UnauthorizedError') {
        res.status(httpStatus.UNAUTHORIZED).json('UNAUTHORIZED please login')
    }

    if (err.name === 'ValidationError') {
        res.status(httpStatus.BAD_REQUEST).json('validation errror')
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json('internal server error')
}