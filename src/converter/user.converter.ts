import {User} from "../model/user.model";

export default class UserConverter {

    convertToDto(user: User): UserDto {
        return {
            id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email')
        };
    }

    convertToModel(dto: NewUserDto): User {
        const model = new User();
        model.setDataValue("name", dto.name);
        model.setDataValue("email", dto.email);
        return model;
    }

}
