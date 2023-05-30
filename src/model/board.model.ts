import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.config";
import {User} from "./user.model";

export class Board extends Model {}

Board.init({
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    access: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Board'
});

Board.belongsTo(User);
User.hasMany(Board);
