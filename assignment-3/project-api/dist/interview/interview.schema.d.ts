import { Document, Types } from 'mongoose';
export declare class Interview extends Document {
    company: string;
    position: string;
    scheduledDate: Date;
    panelist: string;
    description: string;
    candidates: Types.ObjectId[];
}
export declare const InterviewSchema: import("mongoose").Schema<Interview, import("mongoose").Model<Interview, any, any, any, Document<unknown, any, Interview> & Interview & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Interview, Document<unknown, {}, import("mongoose").FlatRecord<Interview>> & import("mongoose").FlatRecord<Interview> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
