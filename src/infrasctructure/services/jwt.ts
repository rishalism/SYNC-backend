import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCES_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from '../../infrasctructure/constants/jwt';

export default class Jwt {
    constructor() {

    }

    generateAccesToken(userId: string, role: string): string {
        const jwtkey = process.env.ACCES_TOKEN_SECRET;
        if (!jwtkey) {
            throw new Error('Access token secret is not defined');
        }
        const payload = { userId, role };
        return jwt.sign(payload, jwtkey, { expiresIn: ACCES_TOKEN_MAX_AGE });
    }

    generateRefreshToken(userId: string, role: string): string {
        const jwtkey = process.env.REFRESH_TOKEN_SECRET;
        if (!jwtkey) {
            throw new Error('Refresh token secret is not defined');
        }
        const payload = { userId, role };
        return jwt.sign(payload, jwtkey, { expiresIn: REFRESH_TOKEN_MAX_AGE });
    }

    
    createAccesTokenWithRefreshToken(token: string): string | null {
        try {
            const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
            const accessToken = this.generateAccesToken(decode.userId, decode.role);
            return accessToken;
        } catch (error) {
            console.error('Error verifying refresh token:', error);
            return null;
        }
    }
}
