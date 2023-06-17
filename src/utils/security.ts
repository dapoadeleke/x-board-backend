import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default class Security {

    async hashPassword(password: string): Promise<string> {
        // return await bcrypt.hash(password, 10);
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    async compare(password: string, hashPassword: string): Promise<boolean> {
        // return await bcrypt.compare(password, hashPassword);
        return bcrypt.compareSync(password, hashPassword);
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
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
    }

}
