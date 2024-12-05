import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';
import {InterviewsModule} from '../interview/interview.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Candidate.name, schema: CandidateSchema }]), InterviewsModule
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports:[CandidateService]
})
export class CandidateModule {}
