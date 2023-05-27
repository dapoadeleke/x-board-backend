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
        const userModel = this.converter.convertToModel(newUserDto);
        return this.repository.create(userModel);
    }

    findAll(): Promise<UserDto[]> {
        return this.repository.findAll();
    }

}
