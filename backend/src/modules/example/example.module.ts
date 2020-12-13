import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module';
import { Example } from 'src/model/example.model';
import { ExampleController } from './controller/example.controller';
import { ExampleService } from './service/example.service';

@Module({
    imports: [TypegooseModule.forFeature([Example])],
    controllers: [ExampleController],
    providers: [ExampleService]
})
export class ExampleModule { }
