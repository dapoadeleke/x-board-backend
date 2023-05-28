"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
class UserConverter {
    convertToDto(user) {
        return {
            id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email')
        };
    }
    convertToModel(dto) {
        const model = new user_model_1.User();
        model.setDataValue("name", dto.name);
        model.setDataValue("email", dto.email);
        return model;
    }
}
exports.default = UserConverter;
//# sourceMappingURL=user.converter.js.map