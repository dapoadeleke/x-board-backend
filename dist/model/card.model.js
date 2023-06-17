"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const board_model_1 = require("./board.model");
class Card extends sequelize_1.Model {
}
exports.Card = Card;
Card.init({
    startX: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    startY: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    x: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    y: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    width: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    votes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    locked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    backgroundColor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    foregroundColor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db_config_1.default,
    modelName: 'Card'
});
Card.belongsTo(board_model_1.Board);
board_model_1.Board.hasMany(Card);
//# sourceMappingURL=card.model.js.map