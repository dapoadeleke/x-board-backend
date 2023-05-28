import {LoginRequest} from "../dto/login-request";
import UserRepository from "../repository/user.repository";
import {autoInjectable} from "tsyringe";
import Security from "../utils/security";
import UserConverter from "../converter/user.converter";

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
            throw new Error("Invalid email and/or password")
        }
        const userDto: UserDto = this.userConverter.convertToDto(user);
        return {
            name: userDto.name,
            email: userDto.email,
            token: this.security.generateAccessToken(userDto)
        };
    }

}
