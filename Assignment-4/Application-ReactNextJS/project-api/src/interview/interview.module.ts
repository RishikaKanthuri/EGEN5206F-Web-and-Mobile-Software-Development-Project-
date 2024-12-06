import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewsService } from './interview.service';
import {InterviewsController} from './interview.controller';
import { Interview, InterviewSchema } from './interview.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Interview.name, schema: InterviewSchema }])],
  providers: [InterviewsService],
  controllers: [InterviewsController],
  exports: [InterviewsService,InterviewsModule],
})
export class InterviewsModule {}