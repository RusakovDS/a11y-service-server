import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {Node} from './node.entity';

@Entity()
export class Rule extends BaseEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  impact: string;

  @Column('varchar', {array: true})
  tags: string;

  @Column()
  description: string;

  @Column()
  help: string;

  @Column()
  helpUrl: string;

  @OneToMany(() => Node, node => node.rule)
  node: Node[]

}
