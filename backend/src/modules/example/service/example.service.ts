import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose/dist/typegoose.decorators';
import { Example } from 'src/model/example.model';

@Injectable()
export class ExampleService {
    constructor(
        @InjectModel(Example) private readonly exampleModel: ReturnModelType<typeof Example>
    ) { }

    async createExample(example: Example): Promise<Example> {
        const createdExample = await new this.exampleModel(example).save();
        return createdExample.toJSON();
    }

    async findExamples(): Promise<Example[]> | null {
        const examples = await this.exampleModel.find().lean().exec();
        return examples;
    }

    async findExampleById(id: string): Promise<Example> | null {
        const example = await this.exampleModel.findById(id).lean().exec();
        return example;
    }
}
