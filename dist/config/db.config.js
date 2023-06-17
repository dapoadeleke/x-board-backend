"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    logging: false,
});
sequelize.authenticate().then(() => {
    console.log("Database connection successful");
}).catch(error => {
    console.log("Database connection failed. ", error);
});
exports.default = sequelize;
//# sourceMappingURL=db.config.js.map