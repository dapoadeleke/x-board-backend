"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:', {
    logging: false
});
// const connectDb = new Sequelize("xboard","app", "Stroustrup@55", {
//     dialect: "mysql",
//     host: "localhost",
//     // logging: false,
//     // models: [User]
// });
exports.default = sequelize;
//# sourceMappingURL=db.config.js.map