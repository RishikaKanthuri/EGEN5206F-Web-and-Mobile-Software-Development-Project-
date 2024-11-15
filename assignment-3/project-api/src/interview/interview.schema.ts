import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Interview extends Document {
    //@Prop({ required: true }) candidateId: string;
    @Prop({ required: true }) company: string;
    @Prop({ required: true }) position: string;
    @Prop({ required: true }) scheduledDate: Date;
    @Prop ({required:true}) panelist: string;
    @Prop ({required:true}) description: string;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Candidate' }] }) // Array of candidate IDs
    candidates: Types.ObjectId[];
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);