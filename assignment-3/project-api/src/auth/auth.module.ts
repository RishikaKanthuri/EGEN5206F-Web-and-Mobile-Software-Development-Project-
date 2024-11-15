import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jws.strategy';
import { CandidateSchema } from '../candidate/schemas/candidate.schema';
import { PanelistSchema } from '../panelist/panelist.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PanelistService } from 'src/panelist/panelist.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),   
    JwtModule.registerAsync({
      imports: [ConfigModule],   
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),   
        signOptions: { expiresIn: '60m' },   
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Candidate', schema: CandidateSchema },   
      { name: 'Panelist', schema: PanelistSchema },     
    ]),
  ],
  providers: [AuthService, JwtStrategy, PanelistService],   
  controllers: [AuthController],   
  exports: [AuthService],  
})
export class AuthModule {}
