import { modelOptions, prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import { Canvas } from './canvas.model';

@modelOptions({ schemaOptions: { collection: 'whiteboards' } })
export class Whiteboard {
    // Join-Code
    @prop({ required: true, type: String })
    _id: string

    @prop({ required: false, _id: false, default: new Canvas() })
    // The canvas that contains all objects of the whiteboard
    canvas: Canvas

    @prop({ required: true })
    // Creator of the whiteboard
    admin: string

    @prop({ type: () => [String], default: [] })
    // Participants
    participants: string[]
}   
