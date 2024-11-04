import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from './candidate/candidate.module';
import { PanelistModule } from './panelist/panelist.module';  
import {AssignModule} from './assign/assign.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {InterviewsModule} from './interview/interview.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/candidatesDB'),
    CandidateModule, PanelistModule, AssignModule, InterviewsModule
  ],
  providers: [AppService],
  controllers: [AppController]

})
export class AppModule {}

