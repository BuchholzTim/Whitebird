
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('mongo_uri'),
                dbName: configService.get<string>('mongo_dbname'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService]
        }),
    ],
})
export class MongoProviderModule { }