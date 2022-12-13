import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { SignInDto } from '../dto/sign-in.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { roleEnum } from '../users/enums/role.enum';
import { ITokenPayload } from '../token/interfaces/token-payload.interface';
import { statusEnum } from '../users/enums/status.enum';
import { SignOptions } from 'jsonwebtoken';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<object> {
    await this.usersService.create(createUserDto, [roleEnum.user]);
    return { message: 'User was created!' };
  }

  async login({ email, password }: SignInDto): Promise<object> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== statusEnum.active) {
        throw new MethodNotAllowedException();
      }

      return this.createNewTokens(user);
    }
    throw new BadRequestException('INVALID CREDENTIALS');
  }

  async refreshToken(refreshToken: string): Promise<object> {
    const token = await this.tokenService.findOneById(refreshToken);

    if (!token) {
      throw new BadRequestException('Token does not exists');
    }
    const expireAt = parseInt(token.expireAt);

    await this.tokenService.delete(token.id);

    if (expireAt >= Date.now()) {
      return await this.createNewTokens(token.userId);
    } else {
      throw new BadRequestException('TOKEN EXPIRED');
    }
  }

  private async createNewTokens(user: number | User) {
    if (typeof user === 'number')
      user = await this.usersService.findOneById(user);

    const tokenPayload: ITokenPayload = {
      _id: user.id,
      status: user.status,
      roles: user.roles,
    };

    const accessToken = this.generateToken(tokenPayload);
    const expiresIn = 3600;

    // Maybe need to be replaced by moment.js...
    const date = new Date();
    const expireAt = date.setDate(date.getDate() + 30).toString();

    const refreshToken = await this.createRefreshToken({
      expireAt,
      user,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn,
      email: user.email,
    };
  }

  private generateToken(data: ITokenPayload, options?: SignOptions): string {
    return this.tokenService.signToken(data, options);
  }

  private async createRefreshToken(createRefreshTokenDto: RefreshTokenDto) {
    const refreshToken = await this.tokenService.create(createRefreshTokenDto);
    return refreshToken.id;
  }
}
