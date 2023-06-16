import jwt from "jsonwebtoken"

export default class AuthorizationHandler {

    public static handle(req, res, next): void {
        const header: string = req.headers.Authorization || req.headers.authorization;
        if (header && header.startsWith("Bearer")) {
            const token = header.split(" ")[1];
            // TODO: Remove this key later
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '$2a$12$oCiZ.T9SIj0VfTnLxB/9s.N1laHdDNKL9Fs.8l1bmJbPukhd37yOG', (error, decoded) => {
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
