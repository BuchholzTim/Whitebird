import { Body, Controller, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Whiteboard } from '@model/whiteboard.model';
import { WhiteboardService } from '../service/whiteboard.service';
import { UpdateWhiteboardDto } from '../dto/updateWhiteboard.dto';

@ApiTags('Whiteboard')
@Controller('whiteboard')
export class WhiteboardController {
    constructor(
        private readonly whiteboardService: WhiteboardService,
    ) { }

    @Get('create')
    async createWhiteboard(): Promise<Whiteboard> {
        return await this.whiteboardService.createWhiteboard();
    }

    @Get('join/:id')
    async joinWhiteboard(@Param('id') id: string): Promise<Whiteboard> {
        return await this.whiteboardService.joinWhiteboardById(id);
    }

    @Put('update/:id')
    async updateWhiteboard(@Param('id') id: string, @Body() updateWhiteboardDto: UpdateWhiteboardDto): Promise<Whiteboard> {
        return await this.whiteboardService.updateWhiteboardById(id, updateWhiteboardDto);
    }
}