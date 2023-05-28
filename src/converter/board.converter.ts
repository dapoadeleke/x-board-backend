import {Board} from "../model/board.model";

export default class BoardConverter {

    convertToResponse(board: Board): BoardResponse {
        return {
            id: board.getDataValue("id"),
            title: board.getDataValue("title")
        };
    }

}
