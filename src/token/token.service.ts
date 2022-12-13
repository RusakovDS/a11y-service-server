import {BadRequestException, Injectable} from '@nestjs/common';
import {IRefreshToken} from './interfaces/user-token.interfaces';
import {RefreshTokenDto} from '../dto/refresh-token.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Token} from '../entities/token.entity';
import {ITokenPayload} from './interfaces/token-payload.interface';
import {SignOptions} from 'jsonwebtoken';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService
  ) {
  }

  async create(tokenData: RefreshTokenDto): Promise<IRefreshToken> {

    const token = new Token();
    token.expireAt = tokenData.expireAt;
    token.user = tokenData.user;

    try {
      return await this.tokenRepository.save(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string): Promise<void> {
    await this.tokenRepository.delete({id})
  }

  // TODO: Delete all tokens (tokens limitation)

  async findOneById(id: string) {
    return await this.tokenRepository.findOne({id: id});
  }

  async exists(refreshToken: string): Promise<boolean> {
    const token = await this.tokenRepository.find({ id:refreshToken});
    return !!token;
  }

  signToken(data: ITokenPayload, options?: SignOptions): string {
    console.log(data);
    return this.jwtService.sign(data, options);
  }
}
