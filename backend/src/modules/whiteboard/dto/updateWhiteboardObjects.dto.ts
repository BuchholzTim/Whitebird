import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ValidateNested } from "class-validator"

export class UpdateWhiteboardObjectDto {
    @ValidateNested({ each: true })
    @ApiProperty()
    canvasObjects: JSON[]

    @ApiProperty()
    version: string
}