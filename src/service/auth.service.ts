import {LoginRequest} from "../dto/login-request";
import UserRepository from "../repository/user.repository";
import {autoInjectable} from "tsyringe";
import Security from "../utils/security";
import UserConverter from "../converter/user.converter";
import {BoardRequest} from "../dto/board.request";
import {Board} from "../model/board.model";
import {UserRequest} from "../dto/user.request";
import {User} from "../model/user.model";

@autoInjectable()
export default class AuthService {

    userRepository: UserRepository;
    security: Security
    userConverter: UserConverter;

    constructor(userRepository: UserRepository, security: Security, userConverter: UserConverter) {
        this.userRepository = userRepository;
        this.security = security;
        this.userConverter = userConverter;
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(request.email);
        if (!user || !await this.security.compare(request.password, user.getDataValue("passwordHash"))) {
            throw new Error("Invalid email and/or password. THANKS")
        }
        const userDto: UserDto = this.userConverter.convertToDto(user);
        return {
            name: userDto.name,
            email: userDto.email,
            token: this.security.generateAccessToken(userDto)
        };
    }

    async register(newUserDto: UserRequest): Promise<UserDto> {
        const userByEmail = await this.userRepository.findByEmail(newUserDto.email);
        if (userByEmail) {
            throw new Error("Email address has been previously registered");
        }
        const passwordHash = await this.security.hashPassword("Password123");
        const user: User = await this.userRepository.create({
            name: newUserDto.name,
            email: newUserDto.email,
            passwordHash: passwordHash
        });
        return this.userConverter.convertToDto(user);
    }

}
