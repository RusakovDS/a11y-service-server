export interface IUser {
  status: string
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly roles: Array<string>;
  readonly password: string;
}