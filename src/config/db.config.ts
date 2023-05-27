import {Sequelize} from "sequelize";

const sequelize = new Sequelize('sqlite::memory:', {
    logging: false
});

// const connectDb = new Sequelize("xboard","app", "Stroustrup@55", {
//     dialect: "mysql",
//     host: "localhost",
//     // logging: false,
//     // models: [User]
// });

export default sequelize;
