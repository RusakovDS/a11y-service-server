import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {axeEngine} from '../axe';
import {ProjectService} from '../project/project.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Report} from '../entities/reports.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ReportsService {

  newTests: Array<object> = [];

  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private projectService: ProjectService
  ) {
  }

  async getAllByProjectId(projectId: number): Promise<Report[]> {
    return await this.reportRepository.find({projectId})
  }

  async getOneById(reportId: number): Promise<Report> {
    return await this.reportRepository.findOne({id: reportId});
  }

  async createReport(projectId: number): Promise<Report> {
    const project = await this.projectService.findOneById(projectId);

    if (!project) throw new BadRequestException('Project does not exist!');

    const activeUrls = project.url.filter(url => url.status === 'active');

    await this.checkUrls(activeUrls);

    const report = new Report();
    report.project = project;
    report.test = this.newTests as [];

    try {
     const result = await this.reportRepository.save(report);
     return await this.reportRepository.findOne({id: result.id});
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }

  }

  async checkUrls(urls): Promise<void> {
    for (const url of urls) {
      try {
        const result = await axeEngine(url);
        this.newTests.push(result);
      } catch (e) {
        throw new InternalServerErrorException(e.message);
      }
    }
  }
}
