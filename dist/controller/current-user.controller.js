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
const authorization_handler_1 = __importDefault(require("../middleware/authorization.handler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
let CurrentUserController = class CurrentUserController {
    constructor() {
        // @ts-ignore
        this.router = new express_1.Router();
    }
    currentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('current user');
            console.log(req);
            res.json(req.user);
        });
    }
    routes() {
        this.router.use(authorization_handler_1.default.handle);
        this.router.get("", (0, express_async_handler_1.default)((req, res) => this.currentUser(req, res)));
        return this.router;
    }
};
CurrentUserController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], CurrentUserController);
exports.default = CurrentUserController;
//# sourceMappingURL=current-user.controller.js.map