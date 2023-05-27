import {User} from "../model/user.model";

export default class UserConverter {

    convertToDto(user: User): UserDto {
        return {
            id: user.getDataValue('id'),
            firstName: user.getDataValue('firstName'),
            lastName: user.getDataValue('lastName'),
            email: user.getDataValue('email')
        };
    }

    convertToModel(dto: NewUserDto): User {
        const model = new User();
        model.setDataValue("firstName", dto.firstName);
        model.setDataValue("lastName", dto.lastName);
        model.setDataValue("email", dto.email);
        return model;
    }

}
