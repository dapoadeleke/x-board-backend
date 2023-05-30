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
const board_service_1 = __importDefault(require("../service/board.service"));
const board_request_1 = require("../dto/board.request");
const class_validator_1 = require("class-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authorization_handler_1 = __importDefault(require("../middleware/authorization.handler"));
let BoardController = class BoardController {
    constructor(service) {
        // @ts-ignore
        this.router = new express_1.Router();
        this.service = service;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let boardRequest = new board_request_1.BoardRequest();
            boardRequest.title = req.body.title;
            boardRequest.access = req.body.access;
            boardRequest.description = req.body.description;
            const errors = yield (0, class_validator_1.validate)(boardRequest);
            if (errors.length > 0) {
                res.status(400).json({ error: errors });
                return;
            }
            // TODO: fix authorization middleware
            const initiator = { id: 1, name: "Dapo", email: "dapoadeleke@gmail.com" }; //req.user;
            const boardResponse = yield this.service.create(boardRequest, initiator);
            res.status(200).json(boardResponse);
        });
    }
    getAllByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            if (!userId) {
                res.status(400).json({ error: "UserId is required" });
                return;
            }
            const boards = yield this.service.findAllByUser(userId);
            res.status(200).json(boards);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const boardId = req.params.boardId;
            if (!boardId) {
                res.status(400).json({ error: "BoardId is required" });
                return;
            }
            const board = yield this.service.findOne(boardId);
            res.status(200).json(board);
        });
    }
    getBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = req.params.slug;
            if (!slug) {
                res.status(400).json({ error: "Slug is required" });
                return;
            }
            const board = yield this.service.findBySlug(slug);
            res.status(200).json(board);
        });
    }
    routes() {
        this.router.use(authorization_handler_1.default.handle);
        this.router.post("", (0, express_async_handler_1.default)((req, res) => this.create(req, res)));
        this.router.get("/:boardId", (0, express_async_handler_1.default)((req, res) => this.get(req, res)));
        this.router.get("/slug/:slug", (0, express_async_handler_1.default)((req, res) => this.getBySlug(req, res)));
        this.router.get("/users/:userId", (0, express_async_handler_1.default)((req, res) => this.getAllByUser(req, res)));
        return this.router;
    }
};
BoardController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [board_service_1.default])
], BoardController);
exports.default = BoardController;
//# sourceMappingURL=board.controller.js.map