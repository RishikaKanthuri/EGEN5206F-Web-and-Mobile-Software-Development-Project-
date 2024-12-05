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

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    // Hashing the password  
    const salt = await bcrypt.genSalt();  
    const hashedPassword = await bcrypt.hash(createCandidateDto.password, salt);  // Hash the password
  
    // creating a new candidate object with the hashed password
    const createdCandidate = new this.candidateModel({
      ...createCandidateDto,
      password: hashedPassword,   
    });
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
    const candidate = await this.candidateModel.findOne({ email: feedbackData.candidateEmail}).exec();

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    candidate.status = 'Interview Finished';
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
