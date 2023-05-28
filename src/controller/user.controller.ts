import {autoInjectable} from 'tsyringe';
import {Router} from 'express';
import UserService from '../service/user.service';
import UserConverter from "../converter/user.converter";
import asyncHandler from 'express-async-handler';


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

    async createUser(req, res) {
        let newUser: NewUserDto = req.body;
        if (!newUser.name || !newUser.email) {
            res.status(400).json({ error: "All fields are mandatory" });
            return;
        }
        const user = await this.service.create(newUser);
        res.status(201).json(user);
    }

    async getUsers(req, res) {
        const users = await this.service.findAll();
        res.json(users);
    }

    routes() {
        this.router.get("/", asyncHandler((req, res) => this.getUsers(req, res)));
        this.router.post("/", asyncHandler((req, res) => this.createUser(req, res)));
        return this.router;
    }

}
