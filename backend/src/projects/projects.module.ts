import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectSchema } from './schemas/projects.schemas';
import { ProjectsService } from './services/projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [MongooseModule.forFeature([{ name: 'Projects', schema: ProjectSchema }])]
})
export class ProjectsModule {}
