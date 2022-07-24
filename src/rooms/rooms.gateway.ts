import { Logger, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NextFunction } from "express";
import { Namespace, Socket } from "socket.io";
import { SocketWithJwtPayload } from "src/user/types/jwtPayload.type";
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
    console.log(client)
        this.logger.log(`Client connected: ${client.id}`);
        this.logger.debug(`Number of connected sockets is : ${sockets.size}`);
    }
    handleDisconnect(client: any) {
        const sockets = this.io.sockets;
        this.logger.log(`Client disconnected: ${client.id}`);
        this.logger.debug(`Number of connected sockets is : ${sockets.size}`);
    }

}

