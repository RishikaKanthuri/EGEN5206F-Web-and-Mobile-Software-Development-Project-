import { Controller, Patch, Body, Get, Param } from '@nestjs/common';
import { AssignService } from './assign.service';

@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

   
  @Patch()
  async assignPanelistToCandidate(
    @Body('candidateId') candidateId: string,
    @Body('panelistName') panelistName: string
  ) {
    return this.assignService.assignPanelist(candidateId, panelistName);
  }

  @Get('candidates-by-interview/:panelistEmail')
  async getCandidatesByInterview(@Param('panelistEmail') panelistEmail: string) {
    return await this.assignService.getCandidatesByInterview(panelistEmail);
  }
}
