import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, unique: true })
  name: string;

  @Column('jsonb')
  borders: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };

  @Column({ name: 'farm_id', type: 'uuid', nullable: false })
  farmId: string;

  @Column({ name: 'soil_id', type: 'uuid', nullable: false })
  soilId: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;
}
