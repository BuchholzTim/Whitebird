import { ExampleSocketGateway } from '@modules/exampleSocket/exampleSocket.gateway';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExampleModule } from './modules/example/example.module';
import { MongoProviderModule } from './providers/mongoProvider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/config/.env'
    }),
    MongoProviderModule,
    ExampleModule,
    ExampleSocketGateway
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
