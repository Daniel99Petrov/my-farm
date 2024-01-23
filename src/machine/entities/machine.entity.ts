import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128 })
  brand: string;

  @Column({ length: 128 })
  model: string;

  @Column({ name: 'registration_number', unique: true, length: 64 })
  registrationNumber: string;

  @Column({ name: 'farm_id', type: 'uuid', nullable: false })
  farmId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;
}
