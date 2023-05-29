import {autoInjectable} from 'tsyringe';
import {Router} from 'express';
import UserService from '../service/user.service';
import UserConverter from "../converter/user.converter";
import asyncHandler from 'express-async-handler';
import {UserRequest} from "../dto/user.request";
import {validate} from "class-validator";


@autoInjectable()
export default class UserController {

    service: UserService;
    converter: UserConverter;
    router: Router;

    constructor(service: UserService, converter: UserConverter) {
        this.service = service;
        this.converter = converter;
        // @ts-ignore
        this.router = new Router();
    }

    async getUsers(req, res) {
        const users = await this.service.findAll();
        res.json(users);
    }

    routes() {
        this.router.get("/", asyncHandler((req, res) => this.getUsers(req, res)));
        return this.router;
    }

}
