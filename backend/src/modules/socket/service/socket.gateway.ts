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

    handleConnection(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`[connection] from client(${client.id})`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`[disconnection] from client(${client.id})`);
    }

    @SubscribeMessage('messageToServer')
    handleMessageToServer(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`[messageToServer] from ${message.sender}(${client.id}) to ${message.room} "${message.message}"`);
        this.webSocketServer.to(message.room).emit('messageToClient', message)
    }

    /*
    @SubscribeMessage('createCanvasObject')
    handleCreateCanvasObject(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`[messageToServer] from ${message.sender}(${client.id}) to ${message.room} "${message.message}"`);
        this.webSocketServer.to(message.room).emit('messageToClient', message)
    }
    */

    /*
    @SubscribeMessage('changeCanvasObject')
    handleChangeCanvasObject(client: Socket, message: {})
    */

    /*
    @SubscribeMessage('deleteCanvasObject')
    */

    @SubscribeMessage('joinWhiteboard')
    handleJoinRoom(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`[joinWhiteboard] ${message.sender}(${client.id}) joins ${message.room}`);
        client.join(message.room);
        client.emit('joinedWhiteboard', message.room);
    }

    @SubscribeMessage('leaveWhiteboard')
    handleLeaveRoom(client: Socket, message: { sender: string, room: string, message: string }) {
        this.logger.log(`[leaveWhiteboard] ${message.sender}(${client.id}) leaves ${message.room}`);
        client.leave(message.room);
        client.emit('leftWhiteboard', message.room);
    }
}