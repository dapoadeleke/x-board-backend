"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const express_1 = require("express");
const user_service_1 = __importDefault(require("../service/user.service"));
let UserController = class UserController {
    constructor(service) {
        this.service = service;
        this.router = new express_1.Router();
    }
    createUser(req, res) {
        const dto = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com"
        };
        const user = this.service.create(dto);
        res.json(user);
    }
    getUsers() {
        const users = this.service.findAll();
        return users;
    }
    routes() {
        this.router.get('/', (req, res) => res.send(this.getUsers()));
        return this.router;
    }
};
UserController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [user_service_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map