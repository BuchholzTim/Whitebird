import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway(3002)
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
        this.logger.log('Client connected: ' + client.id)
    }

    handleDisconnect(client: Socket) {
        this.logger.log('Client disconnected: ' + client.id);
    }

    @SubscribeMessage('messageToServer')
    handleMessageToServer(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log('messageToServer: ' + message);
        this.webSocketServer.to(message.room).emit('messageToClient', message)
    }

    @SubscribeMessage('joinWhiteboard')
    handleJoinRoom(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`${client.id} joins ${message.room}`);
        client.join(message.room);
        client.emit('joinedWhiteboard', message.room);
    }

    @SubscribeMessage('leaveWhiteboard')
    handleLeaveRoom(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`${client.id} leaves ${message.room}`);
        client.leave(message.room);
        client.emit('leftWhiteboard', message.room);
    }
}