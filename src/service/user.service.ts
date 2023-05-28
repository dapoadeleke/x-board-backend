import {autoInjectable} from "tsyringe";
import UserRepository from "../repository/user.repository";
import UserConverter from "../converter/user.converter";
import {User} from "../model/user.model";
import Security from "../utils/security";
import {UserRequest} from "../dto/user.request";

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

    async create(newUserDto: UserRequest): Promise<UserDto> {
        const userByEmail = await this.repository.findByEmail(newUserDto.email);
        if (userByEmail) {
            throw new Error("Email address has been previously registered");
        }
        const passwordHash = await this.security.hashPassword("Password123");
        const user: User = await this.repository.create({
            name: newUserDto.name,
            email: newUserDto.email,
            passwordHash: passwordHash
        });
        return this.converter.convertToDto(user);
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.repository.findAll();
        return users.map(u => this.converter.convertToDto(u));
    }

}
