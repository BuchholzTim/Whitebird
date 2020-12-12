import { prop } from '@typegoose/typegoose';
import { CanvasObject } from './canvasObject.model';

export class Canvas {
    @prop({ _id: false })
    objects: JSON[]

    @prop()
    version: string
}
