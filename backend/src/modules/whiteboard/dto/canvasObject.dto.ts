import { ApiProperty } from "@nestjs/swagger";
import { isWithStringValidate } from "@typegoose/typegoose/lib/internal/utils";
import { Allow, Contains, IsDefined, IsJSON, IsOptional } from "class-validator";

export class CanvasObjectDto {
    @Allow()
    @ApiProperty()
    object: JSON
}