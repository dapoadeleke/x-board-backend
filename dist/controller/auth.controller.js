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
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const login_request_1 = require("../dto/login-request");
const class_validator_1 = require("class-validator");
const auth_service_1 = __importDefault(require("../service/auth.service"));
const tsyringe_1 = require("tsyringe");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
        // @ts-ignore
        this.router = new express_1.Router();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginRequest = new login_request_1.LoginRequest();
            loginRequest.email = req.body.email;
            loginRequest.password = req.body.password;
            const errors = yield (0, class_validator_1.validate)(loginRequest);
            if (errors.length > 0) {
                res.status(400).json({ error: errors });
                return;
            }
            const loginResponse = yield this.service.login(loginRequest);
            res.status(200).json(loginResponse);
        });
    }
    routes() {
        this.router.post("/login", (0, express_async_handler_1.default)((req, res) => this.login(req, res)));
        return this.router;
    }
};
AuthController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [auth_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map