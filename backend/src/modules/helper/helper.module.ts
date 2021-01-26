import { Module } from '@nestjs/common';
import { IdGenerator } from './service/id.generator';

@Module({
    imports: [],
    controllers: [],
    providers: [IdGenerator],
    exports: [IdGenerator]
})
export class HelperModule {}
