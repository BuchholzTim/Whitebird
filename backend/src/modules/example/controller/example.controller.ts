import { Body, Controller, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Example } from 'src/model/example.model';
import { CreateExampleDto } from '@modules/example/dto/createExample.dto';
import { ExampleService } from '../service/example/example.service';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
    constructor(
        private readonly userService: ExampleService,
    ) { }

    @Get()
    async getExamples(): Promise<Example[] | null> {
        return await this.userService.findExamples();
    }

    @Get(':id')
    async getExample(@Param('id') _id: string): Promise<Example> {
        return await this.userService.findExampleById(_id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async postExample(@Body() _example: CreateExampleDto): Promise<Example> {
        return await this.userService.createExample(_example as Example);
    }
}
