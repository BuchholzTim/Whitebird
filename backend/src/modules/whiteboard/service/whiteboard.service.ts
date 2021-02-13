import { IdGenerator } from '@modules/helper/service/id.generator';
import { Whiteboard } from '@model/whiteboard.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators';
import { UpdateWhiteboardObjectDto } from '../dto/updateWhiteboardObjects.dto';

@Injectable()
export class WhiteboardService {
  constructor(
    @InjectModel(Whiteboard)
    private readonly whiteboardModel: ReturnModelType<typeof Whiteboard>,
    private readonly configService: ConfigService,
    private readonly idGenerator: IdGenerator,
  ) {}

  private readonly logger = new Logger(WhiteboardService.name);

  async createWhiteboard(): Promise<Whiteboard> {
    const whiteboard = new Whiteboard();
    whiteboard._id = this.idGenerator.generate(
      this.configService.get<number>('APP_JOINCODE_LENGTH'),
    );
    whiteboard.admin = 'AdminUsername';

    const createdWhiteboard = await new this.whiteboardModel(
      whiteboard as Whiteboard,
    ).save();

    this.logger.log(`Created whiteboard [${createdWhiteboard._id}]`);

    return createdWhiteboard.toJSON();
  }

  async getWhiteboardById(id: string): Promise<Whiteboard> {
    const whiteboard = await this.findWhiteboardById(id);

    if (!whiteboard) {
      throw new HttpException(
        'There is no whiteboard with the id ' + id,
        HttpStatus.NOT_FOUND,
      );
    }

    return whiteboard;
  }

  async findWhiteboardById(id: string): Promise<Whiteboard> {
    const whiteboard = await this.whiteboardModel
      .findById(id)
      .lean()
      .exec();

    if (!whiteboard) {
      throw new HttpException(
        'There is no whiteboard with id ' + id,
        HttpStatus.NOT_FOUND,
      );
    }

    return whiteboard;
  }

  async updateWhiteboardObjects(
    id: string,
    updateObjectsDto: UpdateWhiteboardObjectDto,
  ): Promise<Whiteboard> {
    const updatedWhiteboard = await this.whiteboardModel.findByIdAndUpdate(
      id,
      {
        canvasObjects: updateObjectsDto.canvasObjects,
        version: updateObjectsDto.version,
      },
      { new: true },
    );

    if (!updatedWhiteboard) {
      throw new HttpException(
        'There is no whiteboard with the id ' + id,
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedWhiteboard;
  }

  async addObjectOnWhiteboard(id: string, canvasObject: JSON): Promise<any> {
    const whiteboard = await this.findWhiteboardById(id);

    const whitebirdId = canvasObject['whitebirdData']['id'];

    // Validation if whitebirdData/id is null or empty
    if (whitebirdId === undefined || whitebirdId === '') {
      throw new HttpException(
        'id in request is missing or empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Set persistedOnServer in whitebird data to true
    canvasObject['whitebirdData']['persistedOnServer'] = true;

    // Add object to whiteboard and save index of the added object
    whiteboard.canvasObjects.push(canvasObject);

    // Persist in Database
    this.updateWhiteboardObjects(id, whiteboard);

    const message = {
      sender: '',
      room: id,
      message: canvasObject,
    };

    // Return Message
    return message;
  }

  async removeObjectOnWhiteboard(id: string, canvasObject: JSON): Promise<any> {
    const whiteboard = await this.findWhiteboardById(id);
    let isMatch = false;
    let removedObject: JSON;

    // Validation if whiteboard has objects to remove
    if (whiteboard.canvasObjects.length === 0) {
      throw new HttpException('No objects in whiteboard', HttpStatus.BAD_REQUEST);
    }

    const whitebirdId = canvasObject['whitebirdData']['id'];

    // Validation if whitebirdData/id is null or empty
    if (whitebirdId === undefined || whitebirdId === '') {
      throw new HttpException(
        'id in request is missing or empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Loop through all canvas objects
    for (let i = 0; i < whiteboard.canvasObjects.length; i++) {
      const object = whiteboard.canvasObjects[i];
      const db_whitebird_id = object['whitebirdData']['id'];

      if (db_whitebird_id !== undefined) {
        // Check if ids are matching
        if (db_whitebird_id === whitebirdId) {
          isMatch = true;
          removedObject = whiteboard.canvasObjects[i];
          // Delete the object out of the array when match
          whiteboard.canvasObjects.splice(i, 1);

          // Persist in Database
          this.updateWhiteboardObjects(id, whiteboard);
        }
      }
    }

    removedObject['whitebirdData']['persistedOnServer'] = true;

    // Return corresponding answer match or no match
    if (isMatch) {
      const message = {
        sender: '',
        room: id,
        message: removedObject,
      };

      return message;
    } else {
      throw new HttpException('No matching ids found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateObjectOnWhiteboard(id: string, canvasObject: JSON): Promise<any> {
    const whiteboard = await this.findWhiteboardById(id);
    let isMatch = false;
    let updatedObject: JSON;

    // Validation if whiteboard has objects to update
    if (whiteboard.canvasObjects.length === 0) {
      throw new HttpException('No objects in whiteboard', HttpStatus.BAD_REQUEST);
    }

    const whitebirdId = canvasObject['whitebirdData']['id'];

    // Validation if id exists
    if (whitebirdId === undefined || whitebirdId === '') {
      throw new HttpException(
        'id in request is missing or empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Loop through all canvas objects
    for (let i = 0; i < whiteboard.canvasObjects.length; i++) {
      const object = whiteboard.canvasObjects[i];
      const db_whitebird_id = object['whitebirdData']['id'];

      if (db_whitebird_id !== undefined) {
        // Check if ids are matching
        if (db_whitebird_id === whitebirdId) {
          isMatch = true;

          canvasObject['whitebirdData']['persistedOnServer'] = true;
          // Update the object of the array when match
          whiteboard.canvasObjects[i] = canvasObject;
          updatedObject = whiteboard.canvasObjects[i];

          // Persist in Database
          this.updateWhiteboardObjects(id, whiteboard);
        }
      }
    }

    updatedObject['whitebirdData']['persistedOnServer'] = true;

    // Return corresponding answer match or no match
    if (isMatch) {
      const message = {
        sender: '',
        room: id,
        message: updatedObject,
      };

      return message;
    } else {
      throw new HttpException('No matching ids found', HttpStatus.BAD_REQUEST);
    }
  }
}
