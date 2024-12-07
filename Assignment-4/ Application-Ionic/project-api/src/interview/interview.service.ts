import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interview } from './interview.schema';

@Injectable()
export class InterviewsService {
    constructor(@InjectModel(Interview.name) private interviewModel: Model<Interview>) {}

    // interview data 
    private readonly interviewsData = [
        {
            company: 'Google',
            position: 'Software Engineer',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description:'Google is looking for skilled Software Engineers with experience in cloud computing and system design.',
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },
        {
            company: 'Facebook',
            position: 'System Analyst',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description: 'Facebook is seeking experienced System Analysts to join their team. As a System Analyst, you will be responsible for evaluating and implementing IT systems to meet business needs.' ,
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },
        {
            company: 'ABC Corporation',
            position: 'Mechanical Engineer',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description:'ABC Corporation is hiring Mechanical Engineers to design, develop, and oversee the production of mechanical systems in various industries. Candidates should have experience in CAD and industrial machinery',
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },{
            company: 'XYZ Construction',
            position: 'Civil Engineer',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description: 'XYZ Construction is looking for Civil Engineers with expertise in structural design and urban planning. Join a team of professionals working on large-scale infrastructure projects.' ,
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },
        {
            company: 'DEF Electronics',
            position: 'Electronics Engineer',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description:  'DEF Electronics is hiring skilled Electronics Engineers with a focus on embedded systems, circuit design, and PCB development. Candidates should have knowledge of microcontrollers and signal processing.',
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },
        {
            company: 'GHI Power Systems',
            position: 'Electrical Engineer',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description:'GHI Power Systems is seeking Electrical Engineers to work on power distribution and grid management projects. Expertise in high-voltage systems and electrical safety is required.' ,
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },
        {
            company: 'JKL Financial Services',
            position: 'Accountant',
            scheduledDate: new Date('2023-12-01T10:00:00'),
            description: 'JKL Financial Services is looking for experienced Accountants to manage financial reports, audits, and tax filings. Strong skills in financial analysis and compliance are a must.',
            panelist:'',
            panelistEmail:'',
            candidates:[]
        },
         
    ];


    async findAll(){
        return this.interviewsData;
    }
    
    async addCandidateToInterviewByName(interviewName: string, candidateId: string) {
            const interview = this.interviewsData.find(
                (interview) => interview.position.toLowerCase() === interviewName.toLowerCase()
            );
    
            if (!interview) {
                console.log(`Interview with name ${interviewName} not found`);
                return null;
            }
            if (!interview.candidates.includes(candidateId)) {
                interview.candidates.push(candidateId);
                console.log(`Candidate ${candidateId} added to interview ${interviewName}`);
            } else {
                console.log(`Candidate ${candidateId} is already part of the interview ${interviewName}`);
            }
            return interview;   
    
    }

    getInterviewsByPanelist(panelistName: string) {
        return this.interviewsData.filter(interview => interview.panelist === panelistName);
      }
      
    async getInterviewsByPanelistEmail(panelistEmail: string)  {
        
        return this.interviewsData.filter(interview => interview.panelistEmail === panelistEmail);
      }
      
      async getInterviewByPosition(position: string) {
        return this.interviewsData.find(interview => interview.position === position);
      }
}