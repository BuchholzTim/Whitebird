import { IdGenerator } from '@common/helper/id.generator.ts';
import { Whiteboard } from '@model/whiteboard.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators';
import { CanvasObjectDto } from '../dto/canvasObject.dto';
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

        this.logger.log(`Created whiteboard [${createdWhiteboard._id}]`);
        //Client must connect to the socket with the join code
        //Add admin

        return createdWhiteboard.toJSON();
    }



    async joinWhiteboardById(id: string): Promise<Whiteboard> {
        const whiteboard = await this.findWhiteboardById(id);

        if (!whiteboard) {
            throw new HttpException('There is no whiteboard with the id ' + id, HttpStatus.NOT_FOUND);
        }

        //Client must connect to the socket with the join code
        //Add participant

        this.logger.log(`User joined whiteboard[${whiteboard._id}]`);

        return whiteboard;

    }

    async findWhiteboardById(id: string): Promise<Whiteboard> {
        const whiteboard = await this.whiteboardModel.findById(id).lean().exec();

        if (!whiteboard) {
            throw new HttpException('There is no whiteboard with id ' + id, HttpStatus.NOT_FOUND);
        }

        return whiteboard;
    }

    async updateWhiteboardById(id: string, updateWhiteboardDto: UpdateWhiteboardDto): Promise<Whiteboard> {
        const updatedWhiteboard = await this.whiteboardModel.findByIdAndUpdate(id,
            {
                canvas: updateWhiteboardDto.canvas,
                participants: updateWhiteboardDto.participants
            },
            { new: true });

        if (!updatedWhiteboard) {
            throw new HttpException('There is no whiteboard with the id' + id, HttpStatus.NOT_FOUND);
        }

        return updatedWhiteboard;
    }

    async removeObjectOnWhiteboard(id: string, canvasObjectDto: CanvasObjectDto): Promise<CanvasObjectDto> {
        // Get the whiteboard to the id
        let whiteboard: Whiteboard = await this.findWhiteboardById(id);

        // Convert the request object to an object
        const requestObject = JSON.parse(canvasObjectDto.object.toString());

        // Get the mtiID
        const request_mtiID = requestObject['mtiID'];

        // Check if the request has an mtiID
        if (request_mtiID === undefined) {
            throw new HttpException('There is no mtiID in your request', HttpStatus.NOT_FOUND);
        }

        // Loop through all whiteboard objects
        for (let i = 0; i < whiteboard.canvas.objects.length; i++) {
            // Convert the request object to an object
            const whiteboardObject = JSON.parse(whiteboard.canvas.objects[i].toString());

            // Get the mtiID
            const whiteboard_mtiID = whiteboardObject['mtiID'];

            // Check if the object in the whiteboard has an mtiID
            if (whiteboard_mtiID !== undefined) {
                // Check if the both mtiIDs are the same
                if (request_mtiID == whiteboard_mtiID) {
                    console.log("Its a match");
                    // Cut the object off the array
                    whiteboard.canvas.objects.splice(i, 1);

                    // Update the whiteboard in DB
                    await this.updateWhiteboardById(id, whiteboard as UpdateWhiteboardDto);
                } else {
                    throw new HttpException('No matching mtiIDs', HttpStatus.NOT_FOUND);
                }
            } else {
                throw new HttpException('There is no mtiID in your any of your whiteboard objects', HttpStatus.NOT_FOUND);
            }
        }

        return canvasObjectDto;
    }


    /*
    async addObjectOnWhiteboard(id: string, canvasObjectDto: CanvasObjectDto): Promise<CanvasObjectDto> {
       return NotImplementedException();
    }
    */
}
