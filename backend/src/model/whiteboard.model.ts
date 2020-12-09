import { modelOptions, prop } from '@typegoose/typegoose';
import { Canvas } from './canvas.model';

@modelOptions({ schemaOptions: { collection: 'whiteboards' } })
export class Whiteboard {
    // Join-Code
    @prop({ required: true, type: String })
    _id: string

    @prop({ required: true, type: Canvas, _id: false, default: new Canvas() })
    // The canvas that contains all objects of the whiteboard
    canvas: Canvas

    @prop({ required: true })
    // Creator of the whiteboard
    admin: string

    @prop({ Type: Array<String>(), default: [] })
    // Participants
    participants: string[]
}   
