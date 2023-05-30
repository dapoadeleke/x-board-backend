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
            title: board.getDataValue("title")
        };
    }

    convertToDetailsResponse(board: Board): BoardDetailsResponse {
        return {
            id: board.getDataValue("id"),
            title: board.getDataValue("title"),
            cards: board.getDataValue("Cards").map(c => this.cardConverter.toResource(c))
        };
    }

}
