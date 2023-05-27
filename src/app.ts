
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import sequelize from "./config/db.config";
import UserController from "./controller/user.controller";
import {container} from "tsyringe";
import ErrorHandler from "./middleware/error.handler";

const app = express();
const port = 5001;
const httpServer = new http.Server(app);
const wss = new Server(httpServer, {cors: {origin: '*'}});

wss.on("connection", (client: any) => {
    console.log('a user just connected')
    client.on("error", console.error);
    client.on("message", (data) => {
        console.log('received: %s', data);
    });
    client.on("something", (data) =>{
        console.log('received: %s', data);
        wss.emit('something-else', data);
    })
    wss.send("something");
});

app.use(express.json());
app.use('/api/v1/users', container.resolve(UserController).routes());
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



