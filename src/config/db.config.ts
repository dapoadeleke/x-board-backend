import {Sequelize} from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log("Database connection successful");
}).catch(error => {
    console.log("Database connection failed. ", error);
})

export default sequelize;
