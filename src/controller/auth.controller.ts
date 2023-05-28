import {Router} from "express";
import asyncHandler from "express-async-handler";
import {LoginRequest} from "../dto/login-request";
import {validate} from "class-validator";
import AuthService from "../service/auth.service";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class AuthController {

    router: Router;
    service: AuthService;

    constructor(service: AuthService) {
        this.service = service;
        // @ts-ignore
        this.router = new Router();
    }

    async login(req, res) {
        let loginRequest: LoginRequest = new LoginRequest();
        loginRequest.email = req.body.email;
        loginRequest.password = req.body.password;
        const errors = await validate(loginRequest);
        if (errors.length > 0) {
            res.status(400).json({error: errors})
            return;
        }
        const loginResponse: LoginResponse = await this.service.login(loginRequest);
        res.status(200).json(loginResponse);
    }

    routes() {
        this.router.post("/login",asyncHandler((req, res) => this.login(req, res)));
        return this.router;
    }
}
