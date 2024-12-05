import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from '../candidate/interfaces/candidate.interface';
import { Panelist } from '../panelist/panelist.schema';
import { PanelistService } from '../panelist/panelist.service';
 
@Injectable()
export class AssignService {
  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<Candidate>,
   @InjectModel('Panelist') private readonly panelistModel: Model<Panelist>,
   private readonly panelistService: PanelistService,
    
  ) {}

   
  async assignPanelist(candidateId: string, panelistName: string) {
    const candidate = await this.candidateModel.findById(candidateId);
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    const assignResult = await this.panelistService.assignPanelistToCandidate(candidateId, panelistName);
    candidate.panelist = panelistName;
    candidate.status = "Interview Scheduled";
    await candidate.save();
    return { message: assignResult.message};
  }

  async getCandidatesByInterview(panelistEmail: string): Promise<Candidate[]> {
    
    const panelist = await this.panelistService.getPanelistByEmail(panelistEmail);
    if (!panelist) {
      throw new NotFoundException(`Panelist with  name ${panelistEmail} not found`);
    }

    const candidates = await this.candidateModel.find({
      positionApplied: panelist.interviewName,
    }).exec();

    return candidates;
  }

}
