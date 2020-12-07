import { prop } from '@typegoose/typegoose';

export class Canvas {

    @prop({ required: false })
    content: string
}
