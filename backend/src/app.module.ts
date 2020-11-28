import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { TypegooseModule } from 'nestjs-typegoose';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
