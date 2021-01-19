import { Whiteboard } from '@model/whiteboard.model';
import { WhiteboardService } from '@modules/whiteboard/service/whiteboard.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Socket } from 'dgram';
import { TypegooseModule } from 'nestjs-typegoose';
import { SocketGateway } from './service/socket.gateway';

@Module({
    imports: [TypegooseModule.forFeature([Whiteboard])],
    controllers: [],
    providers: [SocketGateway, WhiteboardService ]

})
export class SocketModule { }