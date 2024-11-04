import { Document } from 'mongoose';

export interface Candidate extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  panelist:string;
  readonly positionApplied: string;
  readonly status: string;
  result: string;
  experience: number;
  education: string;
  time: string;
  skills:string[];
}
