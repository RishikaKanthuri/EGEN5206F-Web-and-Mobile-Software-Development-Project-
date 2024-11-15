import { Controller, Post, Body, Get, Patch, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { InterviewsService} from '../interview/interview.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';


@Controller('candidates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CandidateController {
  @Roles(Role.Candidate)
  @Get('profile')
  getCandidateProfileAuth() {
    return 'Protected candidate profile';
  }
  constructor(
    private readonly candidateService: CandidateService,
    private readonly interviewService: InterviewsService
    
  ) {}

  @Post('register')
  async register(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  async findAll() {
    return this.candidateService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.candidateService.updateStatus(id, status);
  }
  @Post('feedback')
  async submitFeedback(@Body() feedbackData: any) {
    return this.candidateService.updateCandidateResult(feedbackData);
  }
  // @Post('apply/:candidateId')
  //   async applyForPosition(
  //       @Param('candidateId') candidateId: string,
  //       @Body() body: { position: string },
  //   ) {
  //       const { position } = body;

         
  //       await this.candidateService.updateCandidatePosition(candidateId, position);

        
  //       return this.interviewService.addCandidateToInterview(candidateId, position);
  //   }

  @Post('apply/:interviewName')
    async applyForInterview(
        @Param('interviewName') interviewName: string,
        @Body() body: { email: string, education: string, skills: string, positionApplied: string }
    ) {
        const { email, education, skills, positionApplied } = body;

        // Find candidate by name and update details

        const candidate = await this.candidateService.updateCandidateDetailsByEmail(email, {
            education,
            skills,
            positionApplied,
        });

        if (!candidate) {
            throw new NotFoundException(`Candidate not found`);
        }

        // Add candidate to the interview's candidates array based on interviewName
        const updatedInterview = this.interviewService.addCandidateToInterviewByName(interviewName,candidate._id.toString());
        if (!updatedInterview) {
          throw new NotFoundException(`Interview with name ${interviewName} not found`);
      }

      return updatedInterview;
    }

    @Post('login')
  async loginCandidate(@Body('email') email: string) {
    const candidate = await this.candidateService.getCandidateByEmail(email);
    if (!candidate) {
      return { error: 'Candidate not found' };
    }
    return candidate;
  }
   
  @Post('profile')
  async getCandidateProfile(@Body('email') email: string) {
    const candidate = await this.candidateService.getCandidateByEmail(email);
    if (!candidate) {
      return { error: 'Candidate not found' };
    }
    return candidate;
  }

  @Post('interview-candidates')
  async getCandidatesForInterview(@Body('positionApplied') positionApplied: string, @Body('panelist') panelist: string) {
    return this.candidateService.getCandidatesByPositionAndPanelist(positionApplied, panelist);
  }

}
 