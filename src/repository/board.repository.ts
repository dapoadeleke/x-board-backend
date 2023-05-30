import {Board} from "../model/board.model";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class BoardRepository {

    async create(board: any): Promise<Board> {
        return await Board.create(board);
    }

    async findById(id: number): Promise<Board> {
        return await Board.findByPk(id);
    }

    async findAllByUser(userId: number): Promise<Board[]> {
        return await Board.findAll({
            where: {
                UserId: userId
            }
        });
    }
}
