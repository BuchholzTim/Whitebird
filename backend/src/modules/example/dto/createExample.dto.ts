import { idGenerator } from '@common/helper/id.generator'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Max, Min, Length } from 'class-validator'

export class CreateExampleDto {
    @ApiProperty()
    @Length(10)
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @Min(0)
    @Max(1000)
    @IsNotEmpty()
    xPos: number;

    @ApiProperty()
    @Min(0)
    @Max(1000)
    @IsNotEmpty()
    yPos: number;
}