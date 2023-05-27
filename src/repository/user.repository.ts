import {User} from "../model/user.model";
import {autoInjectable} from "tsyringe";
import UserConverter from "../converter/user.converter";

@autoInjectable()
export default class UserRepository {

    converter: UserConverter

    constructor(converter: UserConverter) {
        this.converter = converter;
    }

    async create(user: any): Promise<UserDto> {
        const u = await User.create(user);
        return this.converter.convertToDto(u);
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

}
