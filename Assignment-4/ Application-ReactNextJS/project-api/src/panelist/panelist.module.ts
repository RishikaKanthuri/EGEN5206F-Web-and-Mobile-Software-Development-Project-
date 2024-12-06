import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PanelistService } from './panelist.service';
import { PanelistController } from './panelist.controller';
import { PanelistSchema, Panelist } from './panelist.schema';
import {InterviewsModule} from '../interview/interview.module';  // Import the Interview schema
@Module({
  imports: [MongooseModule.forFeature([{ name: Panelist.name, schema: PanelistSchema },  // Register Panelist schema
       ]), InterviewsModule],
  providers: [PanelistService],
  controllers: [PanelistController],
  exports:[PanelistService]
})
export class PanelistModule {}
