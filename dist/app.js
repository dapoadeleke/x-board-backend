"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const error_handler_1 = __importDefault(require("./middleware/error.handler"));
const auth_controller_1 = __importDefault(require("./controller/auth.controller"));
const board_controller_1 = __importDefault(require("./controller/board.controller"));
const dotenv = __importStar(require("dotenv"));
const app = (0, express_1.default)();
dotenv.config();
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
app.use(express_1.default.json());
app.use("/api/v1/auth", tsyringe_1.container.resolve(auth_controller_1.default).routes());
app.use("/api/v1/users", tsyringe_1.container.resolve(user_controller_1.default).routes());
app.use("/api/v1/boards", tsyringe_1.container.resolve(board_controller_1.default).routes());
app.use(error_handler_1.default.handle);
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