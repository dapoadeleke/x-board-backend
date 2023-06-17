
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import sequelize from "./config/db.config";
import UserController from "./controller/user.controller";
import {container} from "tsyringe";
import ErrorHandler from "./middleware/error.handler";
import AuthController from "./controller/auth.controller";
import BoardController from "./controller/board.controller";
import * as dotenv from "dotenv";
import cors from "cors";
import CardController from "./controller/card.controller";
import CurrentUserController from "./controller/current-user.controller";


const app = express();
dotenv.config();
const port = process.env.PORT || 5001;
const httpServer = new http.Server(app);
const wss = new Server(httpServer, {cors: {origin: '*'}});

wss.on("connection", (client: any) => {
    console.log('a user just connected');
    container.resolve(CardController).saveCard(client, wss);
    client.on("error", console.error);
});

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", container.resolve(AuthController).routes());
app.use("/api/v1/users", container.resolve(UserController).routes());
app.use("/api/v1/boards", container.resolve(BoardController).routes());
app.use("/api/v1/current-user", container.resolve(CurrentUserController).routes());
app.use(ErrorHandler.handle);

const start = async (): Promise<void> => {
    try {
        await sequelize.sync();
        httpServer.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

void start();



