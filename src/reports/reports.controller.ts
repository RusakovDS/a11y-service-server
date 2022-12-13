import {Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {ReportsService} from './reports.service';
import {Report} from '../entities/reports.entity';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createReport(@Body() projectId): Promise<any> {
    return await this.reportsService.createReport(projectId.id);
  }

  @Get('/project/:id')
  async getAllByProjectId(@Param() params): Promise<Report[]> {
    return await this.reportsService.getAllByProjectId(params.id)
  }

  @Get('/:id')
  async getOneById(@Param() params): Promise<Report> {
    return await this.reportsService.getOneById(params.id);
  }
}
