import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AssignService } from '../assign/assign.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { AdminService } from './admin.service';
import { CandidateService } from '../candidate/candidate.service';   
import { PanelistService } from '../panelist/panelist.service';   
@Controller('admin')
//@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)   
export class AdminController {
  constructor(private readonly assignService: AssignService,
    private readonly adminService: AdminService,
    private readonly candidateService: CandidateService,  // Inject CandidateService
    private readonly panelistService: PanelistService 
  ) {}

  @Patch('assign-panelist')
  async assignPanelist(
    @Body('candidateId') candidateId: string,
    @Body('panelistName') panelistName: string
  ) {
    return this.assignService.assignPanelist(candidateId, panelistName);
  }

  @Get('candidates')
  getAllCandidates() {
    return this.candidateService.findAll();   
  }

   
  @Get('panelists')
  getAllPanelists() {
    return this.panelistService.findAll();   
  }
}
