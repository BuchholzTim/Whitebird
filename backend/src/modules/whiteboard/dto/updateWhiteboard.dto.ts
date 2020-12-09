import { Canvas } from '@model/canvas.model'
import { ApiProperty } from '@nestjs/swagger'
import { CanvasDto } from './canvas.dto'

export class UpdateWhiteboardDto {
    // The canvas that contains all objects of the whiteboard

    @ApiProperty()
    canvas: CanvasDto

    @ApiProperty()
    participants: string[]
}