import CardService from "../service/card.service";
import {Router} from "express";
import {Server, Socket} from "socket.io";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class CardController {

    router: Router;
    // service: CardService;

    constructor() {
        // @ts-ignore
        this.router = new Router();
        // this.service = service;
    }

    saveCard(client: Socket, wss: Server): void {
        client.on("save-card", (resource: CardResource) => {
            resource.startX = resource.x || resource.startX;
            resource.startY = resource.y || resource.startY;
            client.broadcast.emit("save-card", resource);
        })
    }



}
