import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Project} from './project.entity';
import {Test} from './test.entity';

@Entity()
export class Url extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Project, project => project.url, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  project: Project;

  @OneToMany(type => Test, test => test.url)
  test: Test[];

  @Column({default: 'active'})
  status: string;

}
