import {autoInjectable} from "tsyringe";
import BoardRepository from "../repository/board.repository";
import {BoardRequest} from "../dto/board.request";
import {Board} from "../model/board.model";
import BoardConverter from "../converter/board.converter";

@autoInjectable()
export default class BoardService {

    repository: BoardRepository;
    converter: BoardConverter;

    constructor(repository: BoardRepository, converter: BoardConverter) {
        this.repository = repository;
        this.converter = converter;
    }

    async create(request: BoardRequest, initiator: UserDto): Promise<BoardResponse> {
        const board: Board = await this.repository.create({title: request.title, UserId: initiator.id});
        return this.converter.convertToResponse(board);
    }

    async findOne(id: number): Promise<BoardDetailsResponse> {
        const board: Board = await this.repository.findById(id);
        if (!board) {
            throw new Error("Board not found");
        }
        return this.converter.convertToDetailsResponse(board);
    }

    async findAllByUser(userId: number): Promise<BoardResponse[]> {
        const boards: Board[] = await this.repository.findAllByUser(userId);
        return boards.map(b => this.converter.convertToResponse(b));
    }

}
