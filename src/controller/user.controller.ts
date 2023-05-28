import {autoInjectable} from 'tsyringe';
import {Router} from 'express';
import UserService from '../service/user.service';
import {NewUserDto} from "../dto/new-user.dto";
import {validate} from "class-validator";
import UserConverter from "../converter/user.converter";

@autoInjectable()
export default class UserController {

    service: UserService;
    converter: UserConverter;
    router: Router;

    constructor(service: UserService, converter: UserConverter) {
        this.service = service;
        this.converter = converter;
        this.router = new Router();
    }

    async createUser(req, res) {
        let newUser: NewUserDto = this.converter.convertRequest(req);
        const errors = await validate(newUser);
        if (errors.length > 0) {
            res.status(400).json({ error: errors });
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
        this.router.get("/", (req, res) => this.getUsers(req, res));
        this.router.post("/", (req, res) => this.createUser(req, res));
        return this.router;
    }

}
