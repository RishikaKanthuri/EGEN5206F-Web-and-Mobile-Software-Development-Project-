import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Panelist } from './interfaces/panelist.interface';

@Injectable()
export class PanelistService {
//   constructor(@InjectModel('Panelist') private readonly panelistModel: Model<Panelist>) {}
  private readonly panelists: Panelist[] = [
    { name: 'Alice Johnson', email: 'alice@smarttalent.com',password:'alice@123',expertise: 'Software Engineering', availability: true },
    {  name: 'Bob Smith',email: 'bob@smarttalent.com',password:'bob@123', expertise: 'Data Science', availability: true },
    {  name: 'Charlie Brown', email: 'charlie@smarttalent.com',password:'charlie@123', expertise: 'Project Management', availability: true },
    {name: 'Luke Anthony', email: 'luke@smarttalent.com',password:'luke@123', expertise: 'Fluid Mechanics', availability: true },
    {name: 'Mark Andrews', email: 'mark@smarttalent.com',password:'mark@123', expertise: 'Civil Engineering', availability: true }
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


async validatePanelist(email: string, password: string): Promise<any> {
   
  const panelist = this.panelists.find(p => p.email === email);
  if (!panelist) {
    throw new UnauthorizedException('Invalid credentials');
  }

   
  if ( password != panelist.password) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return panelist;  
}
 
}
