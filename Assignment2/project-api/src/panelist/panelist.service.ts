import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Panelist } from './interfaces/panelist.interface';

@Injectable()
export class PanelistService {
//   constructor(@InjectModel('Panelist') private readonly panelistModel: Model<Panelist>) {}
  private readonly panelists: Panelist[] = [
    { name: 'Alice Johnson', email: 'alice@smarttalent.com',expertise: 'Software Engineering', availability: true },
    {  name: 'Bob Smith',email: 'bob@smarttalent.com', expertise: 'Data Science', availability: true },
    {  name: 'Charlie Brown', email: 'charlie@smarttalent.com', expertise: 'Project Management', availability: true },
    {name: 'Luke Anthony', email: 'luke@smarttalent.com', expertise: 'Fluid Mechanics', availability: true },
    {name: 'Mark Andrews', email: 'mark@smarttalent.com', expertise: 'Civil Engineering', availability: true }
  ];

  async findAll(){
    
    return this.panelists;
  }

assignPanelistToCandidate(candidateId: string, panelistName: string) {
  const panelist = this.panelists.find(p => p.name === panelistName);
  if (panelist && panelist.availability) {
     
    panelist.availability = false;
    return { message: `${panelist.name} assigned to candidate ${candidateId}` };
  } else {
    throw new Error('Panelist not available or not found');
  }
}
validatePanelistLogin(email: string) {
  const panelist = this.panelists.find(p => p.email === email);
  if (!panelist) {
    throw new Error('Panelist not found');
  }
  return panelist;
}
getPanelistInterviews(panelistName: string) {
  const allInterviews = [
    { panelist: 'Alice Johnson', position: 'Software Engineer', date: '2024-11-05', candidates: ['John Doe', 'Cindy Smith'] },
    { panelist: 'Bob Smith', position: 'System Analyst', date: '2024-11-10', candidates: ['John Smith', 'Peter Pan'] },
    { panelist: 'Charlie Brown', position: 'Data Scientist', date: '2024-11-15', candidates: ['Peter Pan', 'Paul Suzan'] }
  ];

   
  return allInterviews.filter(interview => interview.panelist === panelistName);  
}
}
