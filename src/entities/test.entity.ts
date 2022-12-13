import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Url} from './url.entity';
import {Report} from './reports.entity';
import {Rule} from './rule.entity';
import {Node} from './node.entity';

@Entity()
export class Test extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: string;

  @ManyToOne(() => Url, url => url.test, {
    onDelete: 'CASCADE',
    eager: true
  })
  @JoinTable()
  url: Url;

  @ManyToMany(() => Rule, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  violatedRules: Rule[];

  @OneToMany(() => Node, node => node.test, {
    cascade: true,
    eager: true
  })
  node: Node[];

  @ManyToOne(() => Report, report => report.test, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  })
  report: Report;

  @Column()
  reportId: number
}
