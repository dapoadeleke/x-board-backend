import {Errback, NextFunction, Request, Response} from "express";

export default class ErrorHandler {

    public static handle(err, req: Request, res: Response, next: NextFunction): void {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.json({message: err.message, stackTrace: err.stack});
    }

}
