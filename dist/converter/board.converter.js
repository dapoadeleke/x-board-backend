"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardConverter {
    convertToResponse(board) {
        return {
            id: board.getDataValue("id"),
            title: board.getDataValue("title")
        };
    }
}
exports.default = BoardConverter;
//# sourceMappingURL=board.converter.js.map