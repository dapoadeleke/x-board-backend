import {Board} from "../model/board.model";
import {autoInjectable} from "tsyringe";
import CardConverter from "./card.converter";

@autoInjectable()
export default class BoardConverter {

    cardConverter: CardConverter;

    constructor(cardConverter: CardConverter) {
        this.cardConverter = cardConverter;
    }

    convertToResponse(board: Board): BoardResponse {
        return {
            id: board.getDataValue("id"),
            slug: board.getDataValue("slug"),
            title: board.getDataValue("title"),
            access: board.getDataValue("access")
        };
    }

    convertToDetailsResponse(board: Board): BoardDetailsResponse {
        return {
            id: board.getDataValue("id"),
            title: board.getDataValue("title"),
            access: board.getDataValue("access"),
            cards: board.getDataValue("Cards").map(c => this.cardConverter.toResource(c))
        };
    }

}
