import { Controller, Get, Patch, Param, Body, Post, UseGuards } from '@nestjs/common';
import { PanelistService } from './panelist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';


@Controller('panelists')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class PanelistController {
  constructor(private readonly panelistService: PanelistService) {}
 
   

  @Get()
  async findAll() {
    return this.panelistService.findAll();
  }

   
 
  //  @Post('interviews')
  //  getInterviews(@Body('panelistName') panelistName: string) {
  //    return this.panelistService.getPanelistInterviews(panelistName);
  //  }
}
