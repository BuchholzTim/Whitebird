import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Socket } from 'dgram';
import { SocketGateway } from './service/socket.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [SocketGateway]
})
export class SocketModule { }