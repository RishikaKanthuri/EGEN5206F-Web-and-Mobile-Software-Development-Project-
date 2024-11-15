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
    positionApplied: string;
    status: string;
    panelist: string;
    skills: string[];
    education: string;
    experience: number;
    time: string;
    result: string;
}
export declare class Candidate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    positionApplied: string;
    skills: string[];
    education: string;
    experience: number;
    time: string;
    status: string;
    result: string;
    panelist: string;
}
export declare const CandidateSchema: import("mongoose").Schema<Candidate, import("mongoose").Model<Candidate, any, any, any, Document<unknown, any, Candidate> & Candidate & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Candidate, Document<unknown, {}, import("mongoose").FlatRecord<Candidate>> & import("mongoose").FlatRecord<Candidate> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
