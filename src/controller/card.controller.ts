import CardService from "../service/card.service";
import {Router} from "express";
import {Server, Socket} from "socket.io";
import {autoInjectable} from "tsyringe";
import {Card} from "../model/card.model";

@autoInjectable()
export default class CardController {

    router: Router;
    service: CardService;

    constructor(service: CardService) {
        // @ts-ignore
        this.router = new Router();
        this.service = service;
    }

    async saveCard(client: Socket, wss: Server): Promise<void> {
        client.on("save-card", async (resource: CardResource) => {
            resource.startX = resource.x || resource.startX;
            resource.startY = resource.y || resource.startY;
            if (resource.id) {
                resource = await this.service.update(resource)
            } else {
                resource = await this.service.create(resource);
            }
            // client.broadcast.emit("save-card", resource);
            wss.emit("save-card", resource);
        })
    }



}
