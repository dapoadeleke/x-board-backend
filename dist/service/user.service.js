"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const tsyringe_1 = require("tsyringe");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const user_converter_1 = __importDefault(require("../converter/user.converter"));
const security_1 = __importDefault(require("../utils/security"));
let UserService = class UserService {
    constructor(repository, converter, security) {
        this.repository = repository;
        this.converter = converter;
        this.security = security;
    }
    create(newUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersByEmail = yield this.repository.findByEmail(newUserDto.email);
            if (usersByEmail.length > 0) {
                throw new Error("Email address has been previously registered");
            }
            const passwordHash = yield this.security.hashPassword("Password123");
            console.log('PasswordHash: ', passwordHash);
            const user = yield this.repository.create({
                name: newUserDto.name,
                email: newUserDto.email,
                passwordHash: passwordHash
            });
            return this.converter.convertToDto(user);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repository.findAll();
            return users.map(u => this.converter.convertToDto(u));
        });
    }
};
UserService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [user_repository_1.default, user_converter_1.default, security_1.default])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map