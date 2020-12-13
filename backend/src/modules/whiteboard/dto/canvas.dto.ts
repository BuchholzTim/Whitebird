import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, Contains, IsArray, IsDefined, IsJSON, IsNotEmpty, IsObject, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { json } from "express";
import { CanvasObjectDto } from "./canvasObject.dto";

export class CanvasDto {
    @IsArray()
    @IsJSON({ each: true })
    //@Type(() => JSON)
    @ApiProperty()
    objects: JSON[]

    @ApiProperty()
    version: string

}