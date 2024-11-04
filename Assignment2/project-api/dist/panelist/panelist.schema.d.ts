import { Document } from 'mongoose';
export interface Panelist extends Document {
    name: string;
    expertise: string;
    availability: boolean;
    email: string;
}
export declare class Panelist {
    name: string;
    expertise: string;
    email: string;
    availability: boolean;
}
export declare const PanelistSchema: import("mongoose").Schema<Panelist, import("mongoose").Model<Panelist, any, any, any, Document<unknown, any, Panelist> & Panelist & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Panelist, Document<unknown, {}, import("mongoose").FlatRecord<Panelist>> & import("mongoose").FlatRecord<Panelist> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
