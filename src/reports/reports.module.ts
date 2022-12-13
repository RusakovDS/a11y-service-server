import {Module} from '@nestjs/common';
import {ReportsController} from './reports.controller';
import {ReportsService} from './reports.service';
import {ProjectModule} from '../project/project.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {Report} from '../entities/reports.entity';
import {Test} from '../entities/test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    ProjectModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {
}
