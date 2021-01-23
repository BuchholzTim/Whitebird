import { Body, Controller, Logger, Param } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Whiteboard } from '@model/whiteboard.model';
import { WhiteboardService } from '../service/whiteboard.service';
import { CanvasObjectDto } from '../dto/canvasObject.dto';

@ApiTags('Whiteboard')
@Controller('whiteboard')
export class WhiteboardController {
    constructor(
        private readonly whiteboardService: WhiteboardService,
    ) { }

    private readonly logger = new Logger(WhiteboardController.name);

    @Get('create')
    async createWhiteboard(): Promise<Whiteboard> {
        this.logger.log('GET whiteboard/create');
        return await this.whiteboardService.createWhiteboard();
    }

    @Get(':id/join')
    async joinWhiteboard(@Param('id') id: string): Promise<Whiteboard> {
        this.logger.log(`GET whiteboard/${id}/join`);
        return await this.whiteboardService.joinWhiteboardById(id);
    }

}