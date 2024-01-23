import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Processing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'growing_period_id', type: 'uuid', nullable: false })
  growingPeriodId: string;

  @Column({ name: 'processing_type_id', type: 'uuid', nullable: false })
  processingTypeId: string;

  @Column({ name: 'machine_id', type: 'uuid', nullable: false })
  machineId: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;
}
