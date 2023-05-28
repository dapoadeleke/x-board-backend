import {IsEmail, IsNotEmpty} from "class-validator";

export class UserRequest {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
}
