import jwt from "jsonwebtoken"

export default class AuthorizationHandler {

    public static handle(req, res, next): void {
        const header: string = req.headers.Authorization || req.headers.authorization;
        if (header && header.startsWith("Bearer")) {
            const token = header.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    res.status(401);
                    throw new Error("Unauthorized");
                }
                req.user = decoded.user;
                next();
            });
            if (!token) {
                res.status(401);
                throw new Error("Token is missing");
            }
        } else {
            res.status(401);
            throw new Error("Unauthorized");
        }
    }

}
