import {autoInjectable} from "tsyringe";
import UserRepository from "../repository/user.repository";
import UserConverter from "../converter/user.converter";
import {User} from "../model/user.model";
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

    async create(newUserDto: NewUserDto): Promise<UserDto> {
        const usersByEmail = await this.repository.findByEmail(newUserDto.email);
        if (usersByEmail.length > 0) {
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
