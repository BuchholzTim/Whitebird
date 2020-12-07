import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway(3002, { namespace: '/' })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly configService: ConfigService,
    ) { }

    private logger: Logger = new Logger('SocketGateway');

    @WebSocketServer() webSocketServer: Server

    afterInit(server: Server) {
        this.logger.log('Initialized SocketGateway');
    }

    handleConnection(client: Socket) {
        this.logger.log('Client connected: ' + client.id);
    }

    handleDisconnect(client: Socket) {
        this.logger.log('Client disconnected: ' + client.id);
    }

}