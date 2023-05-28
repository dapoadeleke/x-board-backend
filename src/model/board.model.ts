import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.config";
import {User} from "./user.model";

export class Board extends Model {}

Board.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Board'
});

Board.belongsTo(User);
User.hasMany(Board);
