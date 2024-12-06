import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';
import { CandidateSchema } from '../candidate/schemas/candidate.schema';
import { PanelistSchema } from '../panelist/panelist.schema';
import { PanelistService } from '../panelist/panelist.service';
import { CandidateModule } from '../candidate/candidate.module';   
import { PanelistModule } from '../panelist/panelist.module';   
import { InterviewsModule } from '../interview/interview.module';
import { InterviewSchema } from 'src/interview/interview.schema';
@Module({
  imports: [
    CandidateModule,   
    PanelistModule,InterviewsModule,   
    MongooseModule.forFeature([
      { name: 'Candidate', schema: CandidateSchema },
      { name: 'Panelist', schema: PanelistSchema },
      { name: 'Interview', schema: InterviewSchema}
    ]),
  ],
  controllers: [AssignController],
  providers: [AssignService, PanelistService ],
  exports: [AssignService], 
})
export class AssignModule {}
