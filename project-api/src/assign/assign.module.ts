import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';
import { CandidateSchema } from '../candidate/schemas/candidate.schema';
import { PanelistSchema } from '../panelist/panelist.schema';
import { PanelistService } from '../panelist/panelist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Candidate', schema: CandidateSchema },
      { name: 'Panelist', schema: PanelistSchema }
    ]),
  ],
  controllers: [AssignController],
  providers: [AssignService, PanelistService],
})
export class AssignModule {}
