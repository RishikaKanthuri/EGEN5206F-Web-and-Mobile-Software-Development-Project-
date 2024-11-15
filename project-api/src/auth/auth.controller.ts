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
    return this.authService.login(candidate, 'candidate');
  }

  // Panelist login
  @Post('panelist/login')
  async panelistLogin(@Body() body) {
    const { email, password } = body;
    const panelist = await this.authService.validatePanelist(email, password);
    return this.authService.login(panelist, 'panelist');
  }
}
