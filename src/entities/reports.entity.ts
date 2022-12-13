import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Project} from './project.entity';
import {Test} from  './test.entity'
import {Exclude} from 'class-transformer';

@Entity()
export class Report extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(() => Project, project => project.report, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  project: Project;

  @Column()
  projectId: number;

  @OneToMany(() => Test, test => test.report, {
    eager: true,
    cascade: ['insert']
  })
  test: Test[];

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdDate: Date;

}
