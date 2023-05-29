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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const tsyringe_1 = require("tsyringe");
const security_1 = __importDefault(require("../utils/security"));
const user_converter_1 = __importDefault(require("../converter/user.converter"));
let AuthService = class AuthService {
    constructor(userRepository, security, userConverter) {
        this.userRepository = userRepository;
        this.security = security;
        this.userConverter = userConverter;
    }
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(request.email);
            if (!user || !(yield this.security.compare(request.password, user.getDataValue("passwordHash")))) {
                throw new Error("Invalid email and/or password");
            }
            const userDto = this.userConverter.convertToDto(user);
            return {
                name: userDto.name,
                email: userDto.email,
                token: this.security.generateAccessToken(userDto)
            };
        });
    }
    register(newUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userByEmail = yield this.userRepository.findByEmail(newUserDto.email);
            if (userByEmail) {
                throw new Error("Email address has been previously registered");
            }
            const passwordHash = yield this.security.hashPassword("Password123");
            const user = yield this.userRepository.create({
                name: newUserDto.name,
                email: newUserDto.email,
                passwordHash: passwordHash
            });
            return this.userConverter.convertToDto(user);
        });
    }
};
AuthService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [user_repository_1.default, security_1.default, user_converter_1.default])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map