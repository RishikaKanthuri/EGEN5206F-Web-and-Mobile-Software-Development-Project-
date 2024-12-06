import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AssignModule } from '../assign/assign.module';   
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jws.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CandidateModule } from '../candidate/candidate.module';   
import { PanelistModule } from '../panelist/panelist.module';
 
@Module({
  imports: [
    AssignModule, CandidateModule,   
    PanelistModule,   
    JwtModule.registerAsync({
      imports: [ConfigModule,     
       ],   
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),   
        signOptions: { expiresIn: '60m' },   
      }),
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy ]
})
export class AdminModule {}
