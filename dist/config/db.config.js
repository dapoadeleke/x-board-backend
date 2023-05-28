"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const sequelize = new Sequelize('jdbc:sqlite:identifier.sqlite', {
//     dialect: 'sqlite',
//     logging: false
// });
const sequelize = new sequelize_1.Sequelize("xboard", "app", "Stroustrup@55", {
    dialect: "mysql",
    host: "127.0.0.1",
    logging: false,
});
sequelize.authenticate().then(() => {
    console.log("Database connection successful");
}).catch(error => {
    console.log("Database connection failed. ", error);
});
exports.default = sequelize;
// jdbc:mysql://localhost:3306/xboard
//# sourceMappingURL=db.config.js.map