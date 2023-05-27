"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const connectDb = new sequelize_typescript_1.Sequelize('sqlite::memory:', {
    // const connectDb = new Sequelize('mysql://dapo:%25Security1@localhost:3306/xboard', {
    logging: false
});
// const connectDb = new Sequelize("xboard","app", "Stroustrup@55", {
//     dialect: "mysql",
//     host: "localhost",
//     // logging: false,
//     // models: [User]
// });
exports.default = connectDb;
//# sourceMappingURL=DbConnection.js.map