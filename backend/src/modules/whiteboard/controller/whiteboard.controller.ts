import { Body, Controller, Logger, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Whiteboard } from '@model/whiteboard.model';
import { WhiteboardService } from '../service/whiteboard.service';
import { UpdateWhiteboardDto } from '../dto/updateWhiteboard.dto';
import { CanvasObjectDto } from '../dto/canvasObject.dto';
import { Canvas } from '@model/canvas.model';

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

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateWhiteboard(@Param('id') id: string, @Body() updateWhiteboardDto: UpdateWhiteboardDto): Promise<Whiteboard> {
        this.logger.log(`PUT whiteboard/${id}`);
        return await this.whiteboardService.updateWhiteboardById(id, updateWhiteboardDto);
    }

    @Delete(':id/canvas/object')
    async removeObjectOnWhiteboard(@Param('id') id: string, @Body() object: CanvasObjectDto): Promise<CanvasObjectDto> {
        this.logger.log(`DELETE whiteboard/${id}/canvas/object`);
        return await this.whiteboardService.removeObjectOnWhiteboard(id, object);
    }

    /*
    @Post(':id/canvas/object')
    async addObjectOnWhiteboard(@Param('id') id: string, @Body() object: CanvasObjectDto): Promise<CanvasObjectDto> {
        this.logger.log(`POST whiteboard/${id}/canvas/object`);
        return await this.whiteboardService.addObjectOnWhiteboard(id, object);
    }
    */

}