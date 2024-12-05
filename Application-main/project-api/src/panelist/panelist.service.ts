import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Panelist } from './panelist.schema';
import { CreatePanelistDto } from './create-panelist.dto';
import { InterviewsService } from '../interview/interview.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PanelistService {
  constructor(@InjectModel(Panelist.name) private readonly panelistModel: Model<Panelist>,
  private readonly interviewsService: InterviewsService 
) {}

async createPanelist(createPanelistDto: CreatePanelistDto): Promise<Panelist> {
  const { name, email, password, expertise, interviewName } = createPanelistDto;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new panelist
  const newPanelist = new this.panelistModel({
    name,
    email,
    password: hashedPassword,  
    expertise,
    availability :true,
    interviewName   
  });
  const savedPanelist = await newPanelist.save();
  const interview = await this.interviewsService.getInterviewByPosition(interviewName);
  if (interview) {
    interview.panelist = name;
    interview.panelistEmail = email;
     
  } else {
    throw new NotFoundException(`Interview with name ${interviewName} not found`);
  }

  return savedPanelist;
}

async findAll():Promise<Panelist[]> {
  return this.panelistModel.find().exec();
}

async assignPanelistToCandidate(candidateId: string,email: string) {
 const panelist = await this.panelistModel.findOne({email}).exec();
  
  if (panelist) {
     
     
    return { message: `${panelist.name} assigned to candidate ${candidateId}` };
  } else {
     
    throw new Error(`${name} Panelist not found`);
  }
}

async getPanelistByEmail(email: string) {
  return await this.panelistModel.findOne({ email }).exec();
}

}
