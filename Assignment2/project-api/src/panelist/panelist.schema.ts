// import { Schema } from 'mongoose';

// export const PanelistSchema = new Schema({
//   name: { type: String, required: true },
//   expertise: { type: String, required: true },  // Field to store panelist's expertise
//   availability: { type: Boolean, default: true }  // Field to track if the panelist is available
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export interface Panelist extends Document {
  name: string;
  expertise: string;
  availability: boolean;
  email:string;
}
@Schema()
export class Panelist {
    @Prop({ required: true })
     name: string;
    @Prop({ required: true })
    expertise: string;
    @Prop({ required: true , unique:true})
    email: string;
    @Prop({ required: true })
    availability: boolean;
    
}
export const PanelistSchema = SchemaFactory.createForClass(Panelist);
