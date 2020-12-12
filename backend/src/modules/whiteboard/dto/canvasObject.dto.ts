import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Contains, IsJSON } from "class-validator";

export class CanvasObjectDto {
    @Contains("\"mtiID\"")
    //@Contains("version")
    @IsJSON()
    @ApiProperty()
    object: JSON
}