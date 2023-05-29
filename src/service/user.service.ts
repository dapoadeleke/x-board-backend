import {autoInjectable} from "tsyringe";
import UserRepository from "../repository/user.repository";
import UserConverter from "../converter/user.converter";
import Security from "../utils/security";

@autoInjectable()
export default class UserService {

    repository: UserRepository;
    converter: UserConverter;
    security: Security;

    constructor(repository: UserRepository, converter: UserConverter, security: Security) {
        this.repository = repository;
        this.converter = converter;
        this.security = security;
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.repository.findAll();
        return users.map(u => this.converter.convertToDto(u));
    }

}
