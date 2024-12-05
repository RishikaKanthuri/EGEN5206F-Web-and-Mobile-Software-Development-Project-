import { Controller, Get, Patch, Param, Body, Post, UseGuards } from '@nestjs/common';
import { PanelistService } from './panelist.service';
import { CreatePanelistDto } from '../panelist/create-panelist.dto';


@Controller('panelists')
 
export class PanelistController {
  constructor(private readonly panelistService: PanelistService) {}
 
  @Get()
  async findAll() {
    return this.panelistService.findAll();
  }
  @Post('signup')
  async signupPanelist(@Body() createPanelistDto: CreatePanelistDto) {
    return await this.panelistService.createPanelist(createPanelistDto);
  }
  
}
