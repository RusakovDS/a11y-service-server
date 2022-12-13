import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from '../entities/project.entity';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {Url} from '../entities/url.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Url]),
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
