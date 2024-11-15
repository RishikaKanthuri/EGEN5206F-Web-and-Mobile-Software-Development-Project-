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
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Register Passport with JWT as the default strategy
    JwtModule.registerAsync({
      imports: [ConfigModule],  // Using ConfigModule to securely manage JWT secret and options
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  // JWT secret from environment variables
        signOptions: { expiresIn: '60m' },  // Token expiration time
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Candidate', schema: CandidateSchema },  // Candidate schema for MongoDB
      { name: 'Panelist', schema: PanelistSchema },    // Panelist schema for MongoDB
    ]),
  ],
  providers: [AuthService, JwtStrategy, PanelistService],  // AuthService and JwtStrategy are used for login and authentication logic
  controllers: [AuthController],  // AuthController handles login requests for both candidates and panelists
  exports: [AuthService],  // Export AuthService to use it in other modules (if needed)
})
export class AuthModule {}
