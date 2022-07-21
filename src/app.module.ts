import { Module } from '@nestjs/common';
import {ConfigModule } from '@nestjs/config'
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [ConfigModule.forRoot(),RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
