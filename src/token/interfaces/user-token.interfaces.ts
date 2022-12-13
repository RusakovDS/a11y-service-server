import {User} from "../../entities/user.entity";

export interface IRefreshToken {
  readonly id: string
  readonly expireAt: string;
  readonly user: User;
}
