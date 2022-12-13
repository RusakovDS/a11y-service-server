import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Token extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expireAt: string;

  @ManyToOne(type => User, user => user.tokens)
  user: User;

  @Column()
  userId: number;
}
