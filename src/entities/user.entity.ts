import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
  BaseEntity
} from 'typeorm';
import {roleEnum} from '../users/enums/role.enum';
import {statusEnum} from '../users/enums/status.enum';
import {Token} from './token.entity';
import {Project} from './project.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-array',
    enum: roleEnum,
    default: [roleEnum.user]
  })
  roles: roleEnum[];

  @Column({
    type: 'enum',
    enum: statusEnum,
    default: statusEnum.active // to be replaced to pending for confirmation in next commits
  })
  status: statusEnum;

  @OneToMany(() => Token, token => token.user, { eager: true })
  tokens: Token[];

  @OneToMany(() => Project, project => project.user, { eager: true })
  projects: Project[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
