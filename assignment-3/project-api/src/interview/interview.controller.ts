import { Controller, Get, Post, Body } from '@nestjs/common';
import { InterviewsService } from './interview.service';
import { Interview } from './interview.schema';

@Controller('interviews')
export class InterviewsController {
    constructor(private readonly interviewsService: InterviewsService) {}

    @Get()
    async getAllInterviews(){
        return this.interviewsService.findAll(); 
    }
    @Post('panelist')
  getInterviewsForPanelist(@Body('panelistName') panelistName: string) {
    return this.interviewsService.getInterviewsByPanelist(panelistName);
  }
}