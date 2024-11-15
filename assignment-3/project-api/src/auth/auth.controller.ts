import { Controller, Post, Body } from '@nestjs/common';
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

   
}
