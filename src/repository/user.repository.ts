import {User} from "../model/user.model";
import {autoInjectable} from "tsyringe";
import UserConverter from "../converter/user.converter";

@autoInjectable()
export default class UserRepository {

    converter: UserConverter

    constructor(converter: UserConverter) {
        this.converter = converter;
    }

    async create(user: User): Promise<UserDto> {
        const u = await User.create({ firstName: "Jane", lastName: "Doe" })
        // const u = await User.create(user)
        return this.converter.convertToDto(u);
    }

    async findAll(): Promise<UserDto[]> {
        const users = await User.findAll();
        return users.map(user => this.converter.convertToDto(user));
    }

}
