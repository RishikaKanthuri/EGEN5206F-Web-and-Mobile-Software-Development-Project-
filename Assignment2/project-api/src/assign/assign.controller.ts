import { Controller, Patch, Body } from '@nestjs/common';
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
}
