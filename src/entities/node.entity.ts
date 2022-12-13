import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Rule} from './rule.entity';
import {Test} from './test.entity';

@Entity()
export class Node extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  html: string;

  @ManyToOne(() => Test, test => test.node, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  test: Test;

  @Column()
  testId: number;

  @ManyToOne(() => Rule, rule => rule.node)
  rule: Rule;

  @Column()
  ruleId: string;
}
