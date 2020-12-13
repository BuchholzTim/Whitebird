import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { Whiteboard } from '@model/whiteboard.model';
import { WhiteboardController } from './controller/whiteboard.controller';
import { WhiteboardService } from './service/whiteboard.service';

@Module({
    imports: [TypegooseModule.forFeature([Whiteboard])],
    controllers: [WhiteboardController],
    providers: [WhiteboardService]
})
export class WhiteboardModule { }
