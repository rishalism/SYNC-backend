import { httpStatus } from "../constants/httpStatus";
import { Next, Req, Res } from "../types/expressTypes";



export default function errorHandleMiddleware(err: any, req: Req, res: Res, next: Next) {
    console.log(err, '--------------------from errorHandleMiddleware----------------------------');

    switch (err.name) {
        case 'UnauthorizedError':
            return res.status(httpStatus.UNAUTHORIZED).json('Unauthorized access');
        case 'ValidationError':
            return res.status(httpStatus.BAD_REQUEST).json('Validation error');
        case 'TokenExpiredError':
            return res.status(httpStatus.UNAUTHORIZED).json('Token has expired');
        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}
