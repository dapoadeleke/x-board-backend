import CardRepository from "../repository/card.repository";
import CardConverter from "../converter/card.converter";
import {Card} from "../model/card.model";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class CardService {

    repository: CardRepository;
    converter: CardConverter;

    constructor(repository: CardRepository, converter: CardConverter) {
        this.repository = repository;
        this.converter = converter;
    }

    async create(request: CardResource): Promise<CardResource> {
        const req = this.converter.toModel(request);
        delete req.id;
        console.log('Req: ', req);
        const card: Card = await this.repository.create(req)
        return this.converter.toResource(card);
    }

    async update(request: CardResource): Promise<CardResource> {
        const req = this.converter.toModel(request);
        const card: Card = await this.repository.update(req)
        return this.converter.toResource(card);
    }

}
