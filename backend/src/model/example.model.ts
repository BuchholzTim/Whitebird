import { prop } from '@typegoose/typegoose';

export class Example {

    @prop({ required: true, type: String })
    _id: string

    @prop({ required: true })
    name: string

    @prop({ required: true })
    xPos: number

    @prop({ required: true })
    yPos: number
}
