import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from './candidate/candidate.module';
import { PanelistModule } from './panelist/panelist.module';  
import {AssignModule} from './assign/assign.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {InterviewsModule} from './interview/interview.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/candidatesDB'),
    CandidateModule, PanelistModule, AssignModule, InterviewsModule, AuthModule, AdminModule
  ],
  providers: [AppService],
  controllers: [AppController]

})
export class AppModule {}

