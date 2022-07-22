import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const serverPort = parseInt(configService.get('SERVER_PORT'));
  const clientPort = parseInt(configService.get('CLIENT_PORT'));
  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));
  await app.listen(serverPort);
}
bootstrap();
