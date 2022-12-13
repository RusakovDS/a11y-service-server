import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Project} from '../entities/project.entity';
import {Repository} from 'typeorm';
import {ProjectDto} from '../dto/project.dto';
import {User} from '../entities/user.entity';
import {Url} from '../entities/url.entity';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Url)
    private urlRepository: Repository<Url>
  ) {
  }

  async findOneById(id: number): Promise<Project> {
    return this.projectRepository.findOne({id});
  }

  async getAllByUser(user): Promise<Project[]> {
    const activeUrls = await this.urlRepository.find({status: 'active'});
    return await this.projectRepository.find({user, url: activeUrls});
  }

  async getAllProjectsTitles(user): Promise<Project[]> {
    return await this.projectRepository.find({
      select: ['title', 'id'],
      where: {user}
    });
  }

  async createProject(projectDto: ProjectDto, user: User): Promise<Project> {
    const { title, description, urls} = projectDto;

    const project = new Project();
    project.title = title;
    project.description = description;
    project.user = user;
    project.url = urls as [];

    try {
      return await this.projectRepository.save(project);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updateProject(projectDto: ProjectDto, id: number): Promise<Project> {
    const projectFromDB = await this.projectRepository.findOne(id);

    const urlsOnInactive = projectFromDB.url.filter(url => !projectDto.urls.includes(url));

    await this.markUrlsAsInactive(urlsOnInactive);

    try {
      await this.projectRepository.merge(projectFromDB, projectDto);
      return await this.projectRepository.save(projectFromDB);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async markUrlsAsInactive(urls: Url[]) : Promise<void> {
    urls.forEach(url => this.urlRepository.save({...url, status: 'inactive', project: null}))
  }

}
