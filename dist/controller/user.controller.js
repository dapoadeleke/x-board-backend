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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const express_1 = require("express");
const user_service_1 = __importDefault(require("../service/user.service"));
const user_converter_1 = __importDefault(require("../converter/user.converter"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
let UserController = class UserController {
    constructor(service, converter) {
        this.service = service;
        this.converter = converter;
        // @ts-ignore
        this.router = new express_1.Router();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = req.body;
            if (!newUser.name || !newUser.email) {
                res.status(400).json({ error: "All fields are mandatory" });
                return;
            }
            const user = yield this.service.create(newUser);
            res.status(201).json(user);
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.findAll();
            res.json(users);
        });
    }
    routes() {
        this.router.get("/", (0, express_async_handler_1.default)((req, res) => this.getUsers(req, res)));
        this.router.post("/", (0, express_async_handler_1.default)((req, res) => this.createUser(req, res)));
        return this.router;
    }
};
UserController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [user_service_1.default, user_converter_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map