import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from './interfaces/candidate.interface';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class CandidateService {
  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<Candidate>
  ) {}


  // async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
  //   const createdCandidate = new this.candidateModel(createCandidateDto);
  //   return createdCandidate.save();
  // }

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    // Hash the password before saving
    const salt = await bcrypt.genSalt();  // Generate salt
    const hashedPassword = await bcrypt.hash(createCandidateDto.password, salt);  // Hash the password
  
    // Create a new candidate object with the hashed password
    const createdCandidate = new this.candidateModel({
      ...createCandidateDto,
      password: hashedPassword,  // Save the hashed password instead of the plain text password
    });
  
    // Save the candidate to the database
    return createdCandidate.save();
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateModel.find().exec();
  }

  async getCandidatesByPositionAndPanelist(positionApplied: string, panelist: string): Promise<Candidate[]> {
    return this.candidateModel.find({ positionApplied, panelist }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Candidate> {
    return this.candidateModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async updateCandidateResult(feedbackData: any) {
    const candidate = await this.candidateModel.findOne({ name: feedbackData.candidateName });

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

     
    candidate.result = feedbackData.recommendation;
    await candidate.save();

    return { message: 'Feedback submitted successfully' };
  }

  async updateCandidatePosition(candidateId: string, positionApplied: string): Promise<Candidate> {
    return this.candidateModel.findByIdAndUpdate(candidateId, { positionApplied }, { new: true }).exec();
}

async updateCandidateDetailsByEmail(email: string, updates: { education: string; skills: string; positionApplied: string }): Promise<Candidate> {
  return this.candidateModel.findOneAndUpdate({ email }, updates, { new: true }).exec();
}

async getCandidateByEmail(email: string): Promise<Candidate> {
  return this.candidateModel.findOne({ email }).exec();
}

}
