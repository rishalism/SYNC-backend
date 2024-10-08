import { httpStatus } from "../constants/httpStatus";
import { Next, Req, Res } from "../types/expressTypes";
import jwt, { JwtPayload } from 'jsonwebtoken'




const projectLeadAuth = async (req: Req, res: Res, next: Next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const accestoken: string = token.split(" ")[1];
            const decoded = jwt.verify(accestoken, process.env.ACCES_TOKEN_SECRET as string) as JwtPayload;
            (req as any).user = decoded.userId;
            (req as any).role = decoded.role
            next();
        } else {
            res.status(httpStatus.UNAUTHORIZED).json('UNAUTHORIZED ACCESS');
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(httpStatus.UNAUTHORIZED).json('Token has expired');
        } else {
            next(error);
        }
    }
};

export default projectLeadAuth