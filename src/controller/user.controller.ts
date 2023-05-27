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

    createUser(req, res) {
        const dto: NewUserDto = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com"
        }
        const user = this.service.create(dto);
        res.json(user);
    }

    getUsers() {
        const users = this.service.findAll();
        return users;
    }

    routes() {
        this.router.get('/', (req, res) => res.send(this.getUsers()))
        return this.router;
    }

}
