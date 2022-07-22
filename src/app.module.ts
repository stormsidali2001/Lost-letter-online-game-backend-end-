import { Module } from '@nestjs/common';
import {ConfigModule } from '@nestjs/config'
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(),RoomsModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
