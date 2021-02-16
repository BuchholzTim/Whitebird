import { WhiteboardModule } from '@modules/whiteboard/whiteboard.module';
import { SocketModule } from '@modules/socket/socket.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoProviderModule } from './providers/mongoProvider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/config/.env'
    }),
    MongoProviderModule,
    WhiteboardModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
