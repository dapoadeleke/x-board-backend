import {Sequelize} from "sequelize";

// const sequelize = new Sequelize('jdbc:sqlite:identifier.sqlite', {
//     dialect: 'sqlite',
//     logging: false
// });

const sequelize = new Sequelize("xboard","app", "Stroustrup@55", {
    dialect: "mysql",
    host: "127.0.0.1",
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log("Database connection successful");
}).catch(error => {
    console.log("Database connection failed. ", error);
})

export default sequelize;

// jdbc:mysql://localhost:3306/xboard
