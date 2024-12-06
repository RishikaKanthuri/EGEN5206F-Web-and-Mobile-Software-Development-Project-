import { Controller, Get, Post, Body } from '@nestjs/common';
import { InterviewsService } from './interview.service';
@Controller('interviews')
export class InterviewsController {
    constructor(private readonly interviewsService: InterviewsService) {}

    @Get()
    async getAllInterviews(){
        return this.interviewsService.findAll(); 
    }
    
  @Post('panelist')
  async getPanelistInterviews(@Body() body) {
    const { panelistEmail } = body;  // Get panelist email from the request body
    return this.interviewsService.getInterviewsByPanelistEmail(panelistEmail);
  }
}