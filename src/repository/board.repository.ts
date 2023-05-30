import {Board} from "../model/board.model";
import {autoInjectable} from "tsyringe";
import {Card} from "../model/card.model";

@autoInjectable()
export default class BoardRepository {

    async create(board: any): Promise<Board> {
        return await Board.create(board);
    }

    async findById(id: number): Promise<Board> {
        return await Board.findByPk(id, {
            include: Card
        });
    }

    async findBySlug(slug: string): Promise<Board> {
        return await Board.findOne( {
            where: {
                slug: slug
            },
            include: Card
        });
    }

    async findAllByUser(userId: number): Promise<Board[]> {
        return await Board.findAll({
            where: {
                UserId: userId
            }
        });
    }
}
