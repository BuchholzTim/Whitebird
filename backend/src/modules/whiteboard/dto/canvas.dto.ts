import { ApiProperty } from "@nestjs/swagger";

export class CanvasDto {
    @ApiProperty({ type: String })
    content: string
}