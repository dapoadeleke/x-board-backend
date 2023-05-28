import {User} from "../model/user.model";

export default class UserConverter {

    convertToDto(user: User): UserDto {
        return {
            id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email')
        };
    }

}
