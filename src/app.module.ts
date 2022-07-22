import { Module } from '@nestjs/common';
import {ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [ConfigModule.forRoot(),RoomsModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
