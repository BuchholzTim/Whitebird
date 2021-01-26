import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'whiteboards' }, options: { allowMixed: 0} })
export class Whiteboard {
    // Join-Code
    @prop({ required: true, type: String })
    _id: string

    @prop({ required: true, _id: false, default: [] })
    canvasObjects: JSON[]

    @prop({ required: true, _id: false, default: '1' })
    version: string

    @prop({ required: true })
    // Creator of the whiteboard
    admin: string

    @prop({ type: () => [String], default: [] })
    // Participants
    participants: string[]
}   
