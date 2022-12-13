import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Url} from './url.entity';
import {User} from './user.entity';
import {Exclude} from 'class-transformer';
import {Report} from './reports.entity';

@Entity()
export class Project extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => Url,url => url.project,{
      eager: true,
      cascade: true,
    })
  url: Url[];

  @Exclude()
  @ManyToOne(type => User, user => user.projects)
  user: User;

  @OneToMany(() => Report, report => report.project, {
    eager: true,
    cascade: ['insert', 'remove']
  })
  report: Report[];

  @Column()
  userId: number;

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdDate: Date;

  @UpdateDateColumn({type: 'timestamp with time zone'})
  updateDate: Date;
}
