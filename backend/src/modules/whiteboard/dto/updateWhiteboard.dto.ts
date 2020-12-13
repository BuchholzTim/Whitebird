import { Canvas } from '@model/canvas.model'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { CanvasDto } from './canvas.dto'

export class UpdateWhiteboardDto {
    // The canvas that contains all objects of the whiteboard

    @ValidateNested({ each: true })
    @Type(() => CanvasDto)
    @ApiProperty()
    canvas: CanvasDto

    @IsArray()
    @ApiProperty()
    participants: string[]
}