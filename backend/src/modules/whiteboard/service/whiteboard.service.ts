import { IdGenerator } from '@common/helper/id.generator.ts';
import { Canvas } from '@model/canvas.model';
import { Whiteboard } from '@model/whiteboard.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators';
import { UpdateWhiteboardDto } from '../dto/updateWhiteboard.dto';

@Injectable()
export class WhiteboardService {
    constructor(
        @InjectModel(Whiteboard) private readonly whiteboardModel: ReturnModelType<typeof Whiteboard>,
        private readonly configService: ConfigService,
    ) { }

    private readonly logger = new Logger(WhiteboardService.name);

    async createWhiteboard(): Promise<Whiteboard> {
        const idGenerator = new IdGenerator();
        const whiteboard = new Whiteboard();
        whiteboard._id = idGenerator.generate(this.configService.get<number>('app_joincode_length'));
        whiteboard.admin = "MyUsername"

        const createdWhiteboard = await new this.whiteboardModel(whiteboard as Whiteboard).save();

        //Client must connect to the socket with the join code
        //Add admin

        return createdWhiteboard.toJSON();
    }



    async joinWhiteboardById(id: string): Promise<Whiteboard> {
        const whiteboard = await this.findWhiteboardById(id);

        if (!whiteboard) {
            throw new HttpException('There is no whiteboard with the joinCode ' + id, HttpStatus.NOT_FOUND);
        }

        //Client must connect to the socket with the join code
        //Add participant

        return whiteboard;

    }

    async findWhiteboardById(id: string): Promise<Whiteboard> {
        const whiteboard = await this.whiteboardModel.findById(id).lean().exec();

        if (!whiteboard) {
            throw new HttpException('There is no whiteboard with the joinCode ' + id, HttpStatus.NOT_FOUND);
        }

        return whiteboard;
    }

    async updateWhiteboardById(id: string, updateWhiteboardDto: UpdateWhiteboardDto): Promise<Whiteboard> {
        const updatedWhiteboard = await this.whiteboardModel.findByIdAndUpdate(id, { canvas: updateWhiteboardDto.canvas }, { new: true });

        if (!updatedWhiteboard) {
            throw new HttpException('There is no whiteboard with the joinCode ' + id, HttpStatus.NOT_FOUND);
        }

        return updatedWhiteboard;
    }
}
