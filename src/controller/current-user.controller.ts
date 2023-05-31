import AuthorizationHandler from "../middleware/authorization.handler";
import asyncHandler from "express-async-handler";
import {Router} from "express";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class CurrentUserController {

    router: Router;

    constructor() {
        // @ts-ignore
        this.router = new Router();
    }

    async currentUser(req, res) {
        console.log('current user');
        console.log(req);
        res.json(req.user);
    }

    routes() {
        this.router.use(AuthorizationHandler.handle);
        this.router.get("", asyncHandler((req, res) => this.currentUser(req, res)));
        return this.router;
    }

}
