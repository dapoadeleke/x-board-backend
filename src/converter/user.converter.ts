import {User} from "../model/user.model";
import {NewUserDto} from "../dto/new-user.dto";

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

    convertRequest(req: any): NewUserDto {
        const dto: NewUserDto = new NewUserDto();
        dto.firstName = req.firstName;
        dto.lastName = req.lastName;
        dto.email = req.email;
        return dto;
    }

}
