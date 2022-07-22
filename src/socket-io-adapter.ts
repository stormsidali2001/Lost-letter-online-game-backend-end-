import { INestApplicationContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";


export class SocketIoAdapter extends IoAdapter {
    private readonly logger = new Logger(SocketIoAdapter.name);
    constructor(private app:INestApplicationContext,
                private configService:ConfigService
        ) {
        super(app);
    }
    createIOServer(port: number, options?: ServerOptions): any {
        const clientPort = parseInt(this.configService.get('CLIENT_PORT'));
        const url1 = `http://localhost:${clientPort}`;
        const regexUrl2 = new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`);

        const cors = {
            origin: [
              url1,
              regexUrl2,
            ],
          };
        this.logger.log(`Creating socket.io server with cors configurations : url = ${url1} or url = \n ${regexUrl2.toString()}`);

        return super.createIOServer(port,{...options, cors});

    }
}