import { Module } from '@nestjs/common';
//import { MongooseModule } from '@nestjs/mongoose';
import { PanelistService } from './panelist.service';
import { PanelistController } from './panelist.controller';
//import { PanelistSchema, Panelist } from './panelist.schema';

@Module({
  //imports: [MongooseModule.forFeature([{ name: Panelist.name, schema: PanelistSchema }])],
  providers: [PanelistService],
  controllers: [PanelistController],
})
export class PanelistModule {}
