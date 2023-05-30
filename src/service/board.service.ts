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
        const slug = this.slugify(request.title);
        const board: Board = await this.repository.create({slug: slug, title: request.title, access: request.access, description: request.description, UserId: initiator.id});
        return this.converter.convertToResponse(board);
    }

    async findOne(id: number): Promise<BoardDetailsResponse> {
        const board: Board = await this.repository.findById(id);
        if (!board) {
            throw new Error("Board not found");
        }
        return this.converter.convertToDetailsResponse(board);
    }

    async findBySlug(slug: string): Promise<BoardDetailsResponse> {
        const board: Board = await this.repository.findBySlug(slug);
        if (!board) {
            throw new Error("Board not found");
        }
        return this.converter.convertToDetailsResponse(board);
    }

    async findAllByUser(userId: number): Promise<BoardResponse[]> {
        const boards: Board[] = await this.repository.findAllByUser(userId);
        return boards.map(b => this.converter.convertToResponse(b));
    }

    private slugify(str: string): string {
        return str.toLowerCase().split(" ").join("-").concat("-").concat(Date.now().toString());
    }

}
