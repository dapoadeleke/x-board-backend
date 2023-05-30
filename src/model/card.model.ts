import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.config";
import {Board} from "./board.model";

export class Card extends Model {}

Card.init({
    startX: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startY: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    x: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    y: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    votes: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Card'
});

Card.belongsTo(Board);
Board.hasMany(Card);
