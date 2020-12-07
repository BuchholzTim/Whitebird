import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, { namespace: '/index' })
export class ExampleSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger('ExampleSocketGateway');

    @WebSocketServer() webSocketServer: Server

    afterInit(server: Server) {
        this.logger.log('Initialized ExampleSocketGateway');
    }

    handleConnection(client: Socket) {
        this.logger.log('Client connected: ' + client.id);
    }

    handleDisconnect(client: Socket) {
        this.logger.log('Client disconnected: ' + client.id);
    }

    @SubscribeMessage('msgToServer')
    handleMessageToServer(client: Socket, text: string): WsResponse<string> {
        //equivalent to :void
        //client.emit('msgToClient',text);
        this.logger.log('Message received: ' + text)
        return { event: 'msgToClient', data: text };
    }

    @SubscribeMessage('msgToServerAll')
    handleMessageToAll(client: Socket, text: string): void {
        this.webSocketServer.emit('msgToClient', text);
    }



}