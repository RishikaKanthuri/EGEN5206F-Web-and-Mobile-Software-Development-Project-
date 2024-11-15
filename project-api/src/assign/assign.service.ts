import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from '../candidate/interfaces/candidate.interface';
//import { Panelist } from '../panelist/interfaces/panelist.interface';
import { PanelistService } from '../panelist/panelist.service';

@Injectable()
export class AssignService {
  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<Candidate>,
   // @InjectModel('Panelist') private readonly panelistModel: Model<Panelist>
   private readonly panelistService: PanelistService
  ) {}

   
  async assignPanelist(candidateId: string, panelistName: string) {
     
    const candidate = await this.candidateModel.findById(candidateId);
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    // Find the panelist by name
    // const panelist = await this.panelistModel.findOne({ name: panelistName });
    // if (!panelist || !panelist.availability) {
    //   throw new NotFoundException('Panelist not available or not found');
    // }
    const assignResult = this.panelistService.assignPanelistToCandidate(candidateId, panelistName);

    // Update the candidate's panelist field
    candidate.panelist = panelistName;
    candidate.status = "Interview Scheduled";
    await candidate.save();

    // Update the panelist's availability to false
    // panelist.availability = false;
    // await panelist.save();

    return { message: assignResult.message};
  }
}
