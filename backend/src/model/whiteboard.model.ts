import { prop } from '@typegoose/typegoose';
import { Canvas } from './canvas.model';

export class Whiteboard {
    // Join-Code
    @prop({ required: true, type: String })
    _id: string

    @prop({ required: true, type: Canvas, _id: false })
    // The canvas that contains all objects of the whiteboard
    canvas: Canvas

    @prop({ required: true })
    // Creator of the whiteboard
    admin: string

    @prop({ Type: Array<String>(), default: [] })
    // Participants
    participants: string[]
}   
