import {Sequelize} from "sequelize";
import * as dotenv from "dotenv";


dotenv.config();
const databaseName: string = process.env.DATABASE_NAME;
const username: string = process.env.DATABASE_USERNAME;
const password: string = process.env.DATABASE_PASSWORD;
const host: string = process.env.DATABASE_HOST;

const sequelize = new Sequelize(databaseName,username, password, {
    dialect: "mysql",
    host: host,
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log("Database connection successful");
}).catch(error => {
    console.log("Database connection failed. ", error);
})

export default sequelize;
