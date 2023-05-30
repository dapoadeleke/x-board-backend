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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
let CardController = class CardController {
    // service: CardService;
    constructor() {
        // @ts-ignore
        this.router = new express_1.Router();
        // this.service = service;
    }
    saveCard(client, wss) {
        client.on("save-card", (resource) => {
            console.log('Received: ', resource);
            resource.startX = resource.x || resource.startX;
            resource.startY = resource.y || resource.startY;
            client.broadcast.emit("save-card", resource);
        });
    }
};
CardController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], CardController);
exports.default = CardController;
//# sourceMappingURL=card.controller.js.map