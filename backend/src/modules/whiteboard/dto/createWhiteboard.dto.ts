import { Canvas } from '@model/canvas.model'
import { ApiProperty } from '@nestjs/swagger';

export class CreateWhiteboardDto {
    // Join-Code
    @ApiProperty()
    _id: string

    @ApiProperty({ type: Canvas })
    // The canvas that contains all objects of the whiteboard
    canvas: Canvas = new Canvas();

    @ApiProperty()
    // Creator of the whiteboard
    admin: string = "MyName";

    @ApiProperty()
    // Participants
    participants?: string[] = [];
}