import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.config";

export class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
        sequelize,
        modelName: 'User'
});
