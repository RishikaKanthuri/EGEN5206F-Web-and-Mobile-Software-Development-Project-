 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export interface Panelist extends Document {
  name: string;
  password: string;
  expertise: string;
  availability: boolean;
  email:string;
  interviewName:string;
}
@Schema()
export class Panelist {
    @Prop({ required: true })
     name: string;
     @Prop({ required: true })
     password: string; 
    @Prop({ required: true })
    expertise: string;
    @Prop({ required: true , unique:true})
    email: string;
    @Prop({ required: true })
    availability: boolean;
    @Prop({ required: true })
    interviewName: string;
    
}
export const PanelistSchema = SchemaFactory.createForClass(Panelist);
