import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from '../candidate/schemas/candidate.schema';
import { Panelist } from '../panelist/panelist.schema';
import { PanelistService } from '../panelist/panelist.service';
@Injectable()
export class AuthService {
  constructor(
    private panelistService: PanelistService,
    private jwtService: JwtService,
    @InjectModel('Candidate') private candidateModel: Model<Candidate>,
    @InjectModel('Panelist') private panelistModel: Model<Panelist>,
  ) {}

  private admin = {
    username: 'admin',
    password: '$2y$10$UNSI3sKpR6S1zQfC3ISWU.sBKPepm78RSlPxJr/fbjjCOLRODXUb.', 
    _id :'123', 
    role: 'admin'
  };

  //Admin validation
  async validateAdmin(username: string, password: string): Promise<any> {
    if (username === this.admin.username &&  await bcrypt.compare(password, this.admin.password)){
      return {  email: this.admin.username,_id:'123', role: this.admin.role };
    } else {
      throw new UnauthorizedException('Invalid admin credentials');
    }
  }

  //candidate validation
  async validateCandidate(email: string, password: string): Promise<any> {
    const candidate = await this.candidateModel.findOne({ email });
    if (candidate && await bcrypt.compare(password, candidate.password) ) {
      return candidate;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  //panelist validation
  async validatePanelist(email: string, password: string): Promise<any> {
    const panelist = await this.panelistModel.findOne({ email });
    if (panelist && await bcrypt.compare(password, panelist.password) ) {
      return panelist;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  
  async login(user: any, role: string) {
    const payload = { email: user.email, sub: user._id, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
