 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

 
export interface Candidate extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    positionApplied:string;
    status:string;
    panelist: string;
    skills: string[];
    education: string;
    experience: number;
    time: string;
    result:string;
}

 
@Schema()
export class Candidate {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    state: string;
    
    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    zip: string;

    @Prop()
    positionApplied: string;
    @Prop()
    skills: string[];
    @Prop()
    education: string;
    @Prop()
    experience: number;
    @Prop()
    time: string;

    @Prop({ required: true , default:'Pending'})
    status: string;

    @Prop({ required: true , default:'Not Applicable'})
    result: string;

    @Prop({ required: true , default:'Not Assigned'})
    panelist: string;

}

 
export const CandidateSchema = SchemaFactory.createForClass(Candidate);
