import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
@WebSocketGateway({
    namespace:'rooms'
})

export class RoomsGateWay implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{
    private readonly logger = new Logger(RoomsGateWay.name);
    @WebSocketServer() io:Namespace;
    afterInit() {
        this.logger.log('RoomsGateWay initialized');
    }
    handleConnection(client: Socket, ...args: any[]) {
        const sockets = this.io.sockets;
        this.logger.log(`Client connected: ${client.id}`);
        this.logger.debug(`Number of connected sockets is : ${sockets.size}`);
    }
    handleDisconnect(client: any) {
        throw new Error("Method not implemented.");
    }

}