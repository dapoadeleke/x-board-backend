import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.config";
import {Board} from "./board.model";

export class Card extends Model {}

Card.init({
    startX: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    startY: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    x: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    y: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    width: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    height: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    votes: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    backgroundColor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foregroundColor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    index: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Card'
})

Card.belongsTo(Board);
Board.hasMany(Card);
