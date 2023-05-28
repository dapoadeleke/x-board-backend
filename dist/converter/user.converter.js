"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
const new_user_dto_1 = require("../dto/new-user.dto");
class UserConverter {
    convertToDto(user) {
        return {
            id: user.getDataValue('id'),
            firstName: user.getDataValue('firstName'),
            lastName: user.getDataValue('lastName'),
            email: user.getDataValue('email')
        };
    }
    convertToModel(dto) {
        const model = new user_model_1.User();
        model.setDataValue("firstName", dto.firstName);
        model.setDataValue("lastName", dto.lastName);
        model.setDataValue("email", dto.email);
        return model;
    }
    convertRequest(req) {
        const dto = new new_user_dto_1.NewUserDto();
        dto.firstName = req.firstName;
        dto.lastName = req.lastName;
        dto.email = req.email;
        return dto;
    }
}
exports.default = UserConverter;
//# sourceMappingURL=user.converter.js.map