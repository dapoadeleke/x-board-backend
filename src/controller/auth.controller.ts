import {Router} from "express";
import {LoginRequest} from "../dto/login-request";
import {validate} from "class-validator";
import AuthService from "../service/auth.service";
import {autoInjectable} from "tsyringe";
import asyncHandler from "express-async-handler";
import {UserRequest} from "../dto/user.request";

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

    async register(req, res) {
        let userRequest: UserRequest = new UserRequest();
        userRequest.name = req.body.name;
        userRequest.email = req.body.email;
        const errors = await validate(userRequest);
        if (errors.length > 0) {
            res.status(400).json({error: errors})
            return
        }
        const user = await this.service.register(userRequest);
        res.status(201).json(user);
    }

    routes() {
        this.router.post("/login",asyncHandler((req, res) => this.login(req, res)));
        this.router.post("/register", asyncHandler((req, res) => this.register(req, res)));
        return this.router;
    }
}
