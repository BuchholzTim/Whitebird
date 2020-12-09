import { ApiProperty } from "@nestjs/swagger";
import { IsJSON } from "class-validator";

export class CanvasDto {

    //@IsJSON() oder string
    @ApiProperty()
    objects: JSON[]

    @ApiProperty()
    version: string

}