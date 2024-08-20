import bcrypt from 'bcrypt'

export default class Encrypt {


    async hashpassord(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword;
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword)
        return isPasswordMatch
    }


 
}