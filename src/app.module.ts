import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {configModule} from "./config.root";
import {TokenModule} from "./token/token.module";
import {UsersModule} from "./users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectModule} from './project/project.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    configModule,
    TokenModule,
    TypeOrmModule.forRoot(),
    ProjectModule,
    ReportsModule
  ]
})
export class AppModule {}
