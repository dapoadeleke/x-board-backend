import {autoInjectable} from "tsyringe";
import UserRepository from "../repository/user.repository";
import UserConverter from "../converter/user.converter";

@autoInjectable()
export default class UserService {

    repository: UserRepository;
    converter: UserConverter;

    constructor(repository: UserRepository, converter: UserConverter) {
        this.repository = repository;
        this.converter = converter;
    }

    create(newUserDto: NewUserDto): Promise<UserDto> {
        return this.repository.create(newUserDto);
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.repository.findAll();
        return users.map(u => this.converter.convertToDto(u));
    }

}
