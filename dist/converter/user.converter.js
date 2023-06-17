"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserConverter {
    convertToDto(user) {
        return {
            id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email')
        };
    }
}
exports.default = UserConverter;
//# sourceMappingURL=user.converter.js.map