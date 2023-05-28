import bcrypt from "bcrypt"

export default class Security {

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

}
