import jwt, { JwtPayload } from 'jsonwebtoken'
import { ACCES_TOKEN_MAX_AGE, REFRESH_TOKEM_MAX_AGE } from '../../infrasctructure/constants/jwt'

export default class Jwt {
    constructor() {

    }


    generateAccesToken(userId: string, role: string) {
        const jwtkey = process.env.ACCES_TOKEN_SECRET;
        if (!jwtkey) {
            throw new Error('access key is not defined')
        }
        const payload = { userId, role }
        return jwt.sign(payload, jwtkey, { expiresIn: ACCES_TOKEN_MAX_AGE })
    }


    generateRefreshToken(userId: string, role: string) {
        const jwtkey = process.env.REFRESH_TOKEN_SECRET;
        if (!jwtkey) {
            throw new Error('refresh key is not defined')
        }
        const payload = { userId, role }
        return jwt.sign(payload, jwtkey, { expiresIn: REFRESH_TOKEM_MAX_AGE })
    }


    createAccesTokenWithRefreshToken(token: string): string | null {
        try {
            const decode = jwt.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET as string
            ) as JwtPayload;
            const accessToken = this.generateAccesToken(
                decode.userId,
                decode.role
            );
            return accessToken;
        } catch (error) {
            return null;
        }
    }


}