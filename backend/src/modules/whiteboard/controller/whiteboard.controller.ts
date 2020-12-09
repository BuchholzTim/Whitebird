import { Body, Controller, Logger, Param, UsePipes, ValidationPipe } from '@nestjs/common';
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

    private readonly logger = new Logger(WhiteboardController.name);

    @Get('create')
    async createWhiteboard(): Promise<Whiteboard> {
        this.logger.log('GET whiteboard/create');
        return await this.whiteboardService.createWhiteboard();
    }

    @Get('join/:id')
    async joinWhiteboard(@Param('id') id: string): Promise<Whiteboard> {
        this.logger.log('GET whiteboard/join');
        return await this.whiteboardService.joinWhiteboardById(id);
    }

    @Put('update/:id')
    async updateWhiteboard(@Param('id') id: string, @Body() updateWhiteboardDto: UpdateWhiteboardDto): Promise<Whiteboard> {
        this.logger.log(`PUT whiteboard/update/${id}`);
        return await this.whiteboardService.updateWhiteboardById(id, updateWhiteboardDto);
    }
}