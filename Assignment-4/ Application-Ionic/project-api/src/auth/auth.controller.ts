import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Candidate login
  @Post('candidate/login')
  async candidateLogin(@Body() body) {
    const { email, password } = body;
    const candidate = await this.authService.validateCandidate(email, password);
    const token = await this.authService.login(candidate, 'candidate');
    return {
      access_token: token.access_token,
      candidateId: candidate._id,   
      email: candidate.email,
    };
  }

  //Panelist login
  @Post('panelist/login')
async panelistLogin(@Body() body) {
  const { email, password } = body;
  const panelist = await this.authService.validatePanelist(email, password);  
  const token = await this.authService.login(panelist, 'panelist');
  return {
    access_token: token.access_token,
    
    email: panelist.email
  };
} 

//Admin Login
@Post('admin/login')
  async adminLogin(@Body() body) {
    const { username, password } = body;
    const admin = await this.authService.validateAdmin(username, password);
    if (!admin) {
      throw new UnauthorizedException('Invalid admin credentials');
    }
    return this.authService.login(admin,'admin');
  }
   
}
