import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default class Security {

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    generateAccessToken(user: UserDto): string {
        return jwt.sign(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET || '$2a$12$oCiZ.T9SIj0VfTnLxB/9s.N1laHdDNKL9Fs.8l1bmJbPukhd37yOG',  // TODO: Remove this later
            {expiresIn: "1d"}
        );
    }

}
