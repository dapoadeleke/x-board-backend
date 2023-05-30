import {autoInjectable} from "tsyringe";
import {Card} from "../model/card.model";

@autoInjectable()
export default class CardConverter {

    toResource(model: Card): CardResource {
        const resource: CardResource = {
            id: model.getDataValue("id"),
            boardId: model.getDataValue("boardId"),
            startX: model.getDataValue("startX"),
            startY: model.getDataValue("startY"),
            x: model.getDataValue("x"),
            y: model.getDataValue("y"),
            width: model.getDataValue("width"),
            height: model.getDataValue("height"),
            text: model.getDataValue("text"),
            votes: model.getDataValue("votes"),
            locked: model.getDataValue("locked"),
            index: model.getDataValue("index"),
            textColor: this.convertColor(model)
        }
        return resource;
    }

    toModel(resource: CardResource): any {
        return {
            id: resource.id,
            boardId: resource.boardId,
            startX: resource.startX,
            startY: resource.startY,
            x: resource.x,
            y: resource.y,
            width: resource.width,
            height: resource.height,
            text: resource.text,
            votes: resource.votes,
            locked: resource.locked,
            index: resource.index,
            backgroundColor: resource.textColor.background,
            foregroundColor: resource.textColor.foreground
        }
    }

    convertColor(model: Card): CardTextColor {
        return {
            background: model.getDataValue("backgroundColor"),
            foreground: model.getDataValue("foregroundColor")
        }
    }

}
