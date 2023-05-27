"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const db_config_1 = __importDefault(require("./config/db.config"));
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const tsyringe_1 = require("tsyringe");
const app = (0, express_1.default)();
const port = 5001;
const httpServer = new http_1.default.Server(app);
const wss = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
wss.on("connection", (client) => {
    console.log('a user just connected');
    client.on("error", console.error);
    client.on("message", (data) => {
        console.log('received: %s', data);
    });
    client.on("something", (data) => {
        console.log('received: %s', data);
        wss.emit('something-else', data);
    });
    wss.send("something");
});
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use(express_1.default.json());
app.use('/api/v1/users', tsyringe_1.container.resolve(user_controller_1.default).routes);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_config_1.default.sync();
        httpServer.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
void start();
//# sourceMappingURL=app.js.map