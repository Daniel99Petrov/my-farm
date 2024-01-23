import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFarm1705963028970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farm',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar', length: '128' },
          { name: 'location', type: 'jsonb' },
          { name: 'created', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updated',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          { name: 'deleted', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farm');
  }
}
