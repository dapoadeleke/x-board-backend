"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthorizationHandler {
    static handle(err, req, res, next) {
        const header = req.headers.Authorization || req.headers.authorization;
        if (header && header.startsWith("Bearer")) {
            const token = header.split(" ")[1];
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
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
        }
    }
}
exports.default = AuthorizationHandler;
//# sourceMappingURL=authorization.handler.js.map