import {autoInjectable} from "tsyringe";
import {Router} from "express";
import BoardService from "../service/board.service";
import {BoardRequest} from "../dto/board.request";
import {validate} from "class-validator";
import asyncHandler from "express-async-handler";
import AuthorizationHandler from "../middleware/authorization.handler";

@autoInjectable()
export default class BoardController {

    router: Router;
    service: BoardService;

    constructor(service: BoardService) {
        // @ts-ignore
        this.router = new Router();
        this.service = service;
    }

    async create(req, res) {
        let boardRequest: BoardRequest = new BoardRequest();
        boardRequest.title = req.body.title;
        boardRequest.access = req.body.access;
        boardRequest.description = req.body.description;
        const errors = await validate(boardRequest);
        if (errors.length > 0) {
            res.status(400).json({error: errors})
            return;
        }
        const initiator: UserDto = req.user;
        const boardResponse: BoardResponse = await this.service.create(boardRequest, initiator);
        res.status(200).json(boardResponse);
    }

    async getAllByUser(req, res) {
        const userId = req.params.userId;
        if (!userId) {
            res.status(400).json({error: "UserId is required"});
            return;
        }
        const boards: BoardResponse[] = await this.service.findAllByUser(userId);
        res.status(200).json(boards);
    }

    async get(req, res) {
        const boardId = req.params.boardId;
        if (!boardId) {
            res.status(400).json({error: "BoardId is required"});
            return;
        }
        const board: BoardDetailsResponse = await this.service.findOne(boardId);
        res.status(200).json(board);
    }

    async getBySlug(req, res) {
        const slug = req.params.slug;
        if (!slug) {
            res.status(400).json({error: "Slug is required"});
            return;
        }
        const board: BoardDetailsResponse = await this.service.findBySlug(slug);
        res.status(200).json(board);
    }

    routes() {
        this.router.use(AuthorizationHandler.handle);
        this.router.post("", asyncHandler((req, res) => this.create(req, res)));
        this.router.get("/:boardId", asyncHandler((req, res) => this.get(req, res)));
        this.router.get("/slug/:slug", asyncHandler((req, res) => this.getBySlug(req, res)));
        this.router.get("/users/:userId", asyncHandler((req, res) => this.getAllByUser(req, res)));
        return this.router;
    }
}
