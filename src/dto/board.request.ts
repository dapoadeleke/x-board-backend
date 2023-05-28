import {IsNotEmpty} from "class-validator";

export class BoardRequest {
    @IsNotEmpty()
    title: string;
}
