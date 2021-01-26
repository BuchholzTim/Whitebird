import { Whiteboard } from '@model/whiteboard.model';
import { IdGenerator } from '@modules/helper/service/id.generator';
import { WhiteboardService } from '@modules/whiteboard/service/whiteboard.service';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SocketGateway } from './service/socket.gateway';

@Module({
    imports: [TypegooseModule.forFeature([Whiteboard])],
    controllers: [],
    providers: [SocketGateway, WhiteboardService, IdGenerator ]

})
export class SocketModule { }