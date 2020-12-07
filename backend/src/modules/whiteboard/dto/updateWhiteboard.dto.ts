import { Canvas } from '@model/canvas.model'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateWhiteboardDto {
    // The canvas that contains all objects of the whiteboard

    @ApiProperty()
    canvas: Canvas

    // // Participants
    // @ApiProperty()
    // participants?: string[]
}