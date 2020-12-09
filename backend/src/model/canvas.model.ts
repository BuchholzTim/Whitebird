import { mongoose, prop } from '@typegoose/typegoose';

export class Canvas {

    @prop({ required: false, Type: Array<JSON>() })

    objects: JSON[]

    @prop({ required: false, default: '' })
    version: string
}
