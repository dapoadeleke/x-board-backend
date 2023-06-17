"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
let CardConverter = class CardConverter {
    toResource(model) {
        const resource = {
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
        };
        return resource;
    }
    toModel(resource) {
        return {
            id: resource.id,
            BoardId: resource.boardId,
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
        };
    }
    convertColor(model) {
        return {
            background: model.getDataValue("backgroundColor"),
            foreground: model.getDataValue("foregroundColor")
        };
    }
};
CardConverter = __decorate([
    (0, tsyringe_1.autoInjectable)()
], CardConverter);
exports.default = CardConverter;
//# sourceMappingURL=card.converter.js.map