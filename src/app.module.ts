import { Module } from '@nestjs/common';
import {ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AccesTokenGuard } from './guards/acces-token.guard';
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(),RoomsModule,UserModule,JwtModule.register({})],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccesTokenGuard,
    },
  ],
})
export class AppModule {}
