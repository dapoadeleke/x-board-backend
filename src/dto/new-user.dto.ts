import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class NewUserDto {
    @Length(23, 60)
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    email: string;
}
