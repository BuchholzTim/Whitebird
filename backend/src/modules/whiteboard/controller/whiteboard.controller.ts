import { Controller, Logger, Param } from '@nestjs/common';
import { Get} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Whiteboard } from '@model/whiteboard.model';
import { WhiteboardService } from '../service/whiteboard.service';

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

    @Get(':id')
    async getWhiteboard(@Param('id') id: string): Promise<Whiteboard> {
        this.logger.log(`GET whiteboard/${id}`);
        return await this.whiteboardService.getWhiteboardById(id);
    }
}