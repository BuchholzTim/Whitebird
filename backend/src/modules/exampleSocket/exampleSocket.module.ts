import { Module } from '@nestjs/common';
import { ExampleSocketGateway } from './exampleSocket.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [ExampleSocketGateway],
})
export class ExampleSocketModule { }
