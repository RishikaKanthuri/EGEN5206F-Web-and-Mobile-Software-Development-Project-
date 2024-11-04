import { Controller, Get, Patch, Param, Body, Post } from '@nestjs/common';
import { PanelistService } from './panelist.service';

@Controller('panelists')
export class PanelistController {
  constructor(private readonly panelistService: PanelistService) {}

  @Get()
  async findAll() {
    return this.panelistService.findAll();
  }

   @Post('login')
   login(@Body('email') email: string) {
     return this.panelistService.validatePanelistLogin(email);
   }
 
   @Post('interviews')
   getInterviews(@Body('panelistName') panelistName: string) {
     return this.panelistService.getPanelistInterviews(panelistName);
   }
}
