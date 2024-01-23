import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class GrowingPeriod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'field_id', type: 'uuid', nullable: false })
  fieldId: string;

  @Column({ name: 'crop_id', type: 'uuid', nullable: false })
  cropId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;
}
