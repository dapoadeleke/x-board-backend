import {Card} from "../model/card.model";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class CardRepository {

    async create(card: any): Promise<Card> {
        return await Card.create(card);
    }

    async findById(id: number): Promise<Card> {
        return await Card.findByPk(id);
    }

    async update(card: any): Promise<Card> {
        await Card.update(card, {
            where: {
                id: card.id
            }
        });
        return await this.findById(card.id);
    }

}
