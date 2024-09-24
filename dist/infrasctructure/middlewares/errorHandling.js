"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandleMiddleware;
const httpStatus_1 = require("../constants/httpStatus");
function errorHandleMiddleware(err, req, res, next) {
    console.log(err, '--------------------from errorHandleMiddleware----------------------------');
    switch (err.name) {
        case 'UnauthorizedError':
            return res.status(httpStatus_1.httpStatus.UNAUTHORIZED).json('Unauthorized access');
        case 'ValidationError':
            return res.status(httpStatus_1.httpStatus.BAD_REQUEST).json('Validation error');
        case 'TokenExpiredError':
            return res.status(httpStatus_1.httpStatus.UNAUTHORIZED).json('Token has expired');
        default:
            return res.status(httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}
