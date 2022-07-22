import { Module } from '@nestjs/common';
import {ConfigModule } from '@nestjs/config'
import { jwtModule } from './modules.config';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [ConfigModule.forRoot(),RoomsModule,jwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
