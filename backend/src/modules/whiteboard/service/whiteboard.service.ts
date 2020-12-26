import { IdGenerator } from '@common/helper/id.generator.ts';
import { Whiteboard } from '@model/whiteboard.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators';
import { CanvasObjectDto } from '../dto/canvasObject.dto';
import { UpdateWhiteboardObjectDto } from '../dto/updateWhiteboardObjects.dto';

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


    async updateWhiteboardObjects(id: string, updateObjectsDto: UpdateWhiteboardObjectDto): Promise<Whiteboard> {
        const updatedWhiteboard = await this.whiteboardModel.findByIdAndUpdate(id,
            {
                canvasObjects: updateObjectsDto.canvasObjects,
                version: updateObjectsDto.version
            },
            { new: true });

        if (!updatedWhiteboard) {
            throw new HttpException('There is no whiteboard with the id' + id, HttpStatus.NOT_FOUND);
        }

        return updatedWhiteboard;
    }


    async addObjectOnWhiteboard(id: string, canvasObjectDto: CanvasObjectDto): Promise<any> {
        let whiteboard = await this.findWhiteboardById(id);

        const mtiID = canvasObjectDto.object['mtiData']['mtiID'];

        // Validation if mtiData/mtiID is null or empty
        if (mtiID === undefined || mtiID === "") {
            throw new HttpException('mtiID in request is missing or empty', HttpStatus.BAD_REQUEST);
        }


        // Add object to whiteboard and save index of the added object
        whiteboard.canvasObjects.push(canvasObjectDto.object);

        // Persist in Database
        this.updateWhiteboardObjects(id, whiteboard);

        // Return last Object in Array
        return whiteboard.canvasObjects[whiteboard.canvasObjects.length - 1];
    }


    async removeObjectOnWhiteboard(id: string, canvasObjectDto: CanvasObjectDto): Promise<any> {
        let whiteboard = await this.findWhiteboardById(id);
        let isMatch = false;
        let removedObject: JSON;

        // Validation if whiteboard has objects to remove
        if (whiteboard.canvasObjects.length === 0) {
            throw new HttpException('No objects in whiteboard', HttpStatus.BAD_REQUEST);
        }

        const canvasObject_mtiID = canvasObjectDto.object['mtiData']['mtiID'];

        // Validation if mtiData/mtiID is null or empty
        if (canvasObject_mtiID === undefined || canvasObject_mtiID === "") {
            throw new HttpException('mtiID in request is missing or empty', HttpStatus.BAD_REQUEST);
        }

        // Loop through all canvas objects
        for (let i = 0; i < whiteboard.canvasObjects.length; i++) {
            const object = whiteboard.canvasObjects[i];
            const whiteboard_mtiID = object['mtiData']['mtiID'];


            if (whiteboard_mtiID !== undefined) {
                // Check if mtiIDs are matching
                if (whiteboard_mtiID === canvasObject_mtiID) {
                    isMatch = true;
                    removedObject = whiteboard.canvasObjects[i];
                    // Delete the object out of the array when match
                    whiteboard.canvasObjects.splice(i, 1);

                    // Persist in Database
                    this.updateWhiteboardObjects(id, whiteboard);
                }
            }
        }

        // Return corresponding anwer match or no match
        if (isMatch) {
            return removedObject;
        } else {
            throw new HttpException('No matching mtiIDs found', HttpStatus.BAD_REQUEST);
        }
    }


    async updateObjectOnWhiteboard(id: string, canvasObjectDto: CanvasObjectDto): Promise<any> {
        let whiteboard = await this.findWhiteboardById(id);
        let isMatch = false;
        let updatedObject: JSON;

        // Validation if whiteboard has objects to update
        if (whiteboard.canvasObjects.length === 0) {
            throw new HttpException('No objects in whiteboard', HttpStatus.BAD_REQUEST);
        }

        const canvasObject_mtiID = canvasObjectDto.object['mtiData']['mtiID'];

        // Validation if mtiID exists
        if (canvasObject_mtiID === undefined || canvasObject_mtiID === "") {
            throw new HttpException('mtiID in request is missing or empty', HttpStatus.BAD_REQUEST);
        }

        // Loop through all canvas objects
        for (let i = 0; i < whiteboard.canvasObjects.length; i++) {
            const object = whiteboard.canvasObjects[i];
            const whiteboard_mtiID = object['mtiData']['mtiID'];

            if (whiteboard_mtiID !== undefined) {
                // Check if mtiIDs are matching
                if (whiteboard_mtiID === canvasObject_mtiID) {
                    isMatch = true;

                    // Update the object of the array when match
                    whiteboard.canvasObjects[i] = canvasObjectDto.object;
                    updatedObject = whiteboard.canvasObjects[i];

                    // Persist in Database
                    this.updateWhiteboardObjects(id, whiteboard);
                }
            }
        }

        // Return corresponding anwer match or no match
        if (isMatch) {
            return updatedObject;
        } else {
            throw new HttpException('No matching mtiIDs found', HttpStatus.BAD_REQUEST);
        }
    }


}
