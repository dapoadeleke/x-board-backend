import {autoInjectable} from 'tsyringe';
import {Router} from 'express';
import UserService from '../service/user.service';

@autoInjectable()
export default class UserController {

    service: UserService;
    router: Router;

    constructor(service: UserService) {
        this.service = service;
        this.router = new Router();
    }

    async createUser(req, res) {
        const newUser: NewUserDto = req.body;
        if (!newUser.firstName || !newUser.lastName || !newUser.email) {
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
        this.router.get("/", (req, res) => this.getUsers(req, res));
        this.router.post("/", (req, res) => this.createUser(req, res));
        return this.router;
    }

}
