import {IsString, IsNotEmpty} from 'class-validator';
import {User} from "../entities/user.entity";

export class RefreshTokenDto {
  @IsString()
  expireAt: string;

  @IsNotEmpty()
  user: User;
}
