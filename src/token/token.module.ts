import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Token} from '../entities/token.entity';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from '../auth/jwt.strategy';
import {UsersModule} from '../users/users.module';
import {User} from '../entities/user.entity';
import {configModule} from '../config.root';

@Module({
  imports: [
    UsersModule,
    configModule,
    TypeOrmModule.forFeature([Token, User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: 1800},
    }),
  ],
  providers: [TokenService, JwtStrategy],
  exports: [TokenService, JwtStrategy, PassportModule]
})
export class TokenModule {
}
