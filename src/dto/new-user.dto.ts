import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class NewUserDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    email: string;
}
