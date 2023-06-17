"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const card_converter_1 = __importDefault(require("./card.converter"));
let BoardConverter = class BoardConverter {
    constructor(cardConverter) {
        this.cardConverter = cardConverter;
    }
    convertToResponse(board) {
        return {
            id: board.getDataValue("id"),
            slug: board.getDataValue("slug"),
            title: board.getDataValue("title"),
            access: board.getDataValue("access")
        };
    }
    convertToDetailsResponse(board) {
        return {
            id: board.getDataValue("id"),
            title: board.getDataValue("title"),
            access: board.getDataValue("access"),
            cards: board.getDataValue("Cards").map(c => this.cardConverter.toResource(c))
        };
    }
};
BoardConverter = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [card_converter_1.default])
], BoardConverter);
exports.default = BoardConverter;
//# sourceMappingURL=board.converter.js.map