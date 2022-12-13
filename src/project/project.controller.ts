import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import {ProjectService} from './project.service';
import {Project} from '../entities/project.entity';
import {ProjectDto} from '../dto/project.dto';
import {GetUser} from '../auth/get-user.decorator';
import {User} from '../entities/user.entity';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {
  }

  @Get()
  async getAllByUser(@GetUser() user: User): Promise<Project[]> {
    return this.projectService.getAllByUser(user);
  }

  @Get('/titles')
  async getAllProjectsTitles(@GetUser() user: User): Promise<Project[]> {
    return this.projectService.getAllProjectsTitles(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createProject(@Body(new ValidationPipe()) ProjectDto: ProjectDto, @GetUser() user: User): Promise<Project> {
    return this.projectService.createProject(ProjectDto, user);
  }

  @Put('/:id')
  async updateProject(@Body(new ValidationPipe()) ProjectDto: ProjectDto, @Param() id: number): Promise<Project> {
    return this.projectService.updateProject(ProjectDto, id);
  }

  @Delete(':id')
  async deleteProject(@Param() id: number): Promise<void> {
    return this.projectService.deleteProject(id);
  }
}
