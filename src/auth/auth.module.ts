import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from '../users/users.module';
import {TokenModule} from '../token/token.module';
import {configModule} from '../config.root';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    configModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
