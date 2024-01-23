import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGrowingPeriod1705963048826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the growing_period table
    await queryRunner.createTable(
      new Table({
        name: 'growing_period',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'field_id', type: 'uuid', isNullable: false },
          { name: 'crop_id', type: 'uuid', isNullable: false },
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

    // Create foreign keys
    await queryRunner.createForeignKey(
      'growing_period',
      new TableForeignKey({
        columnNames: ['field_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'field',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'growing_period',
      new TableForeignKey({
        columnNames: ['crop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'crop',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys first
    await queryRunner.dropForeignKey(
      'growing_period',
      'FK_growing_period_field',
    );
    await queryRunner.dropForeignKey(
      'growing_period',
      'FK_growing_period_crop',
    );

    // Drop the growing_period table
    await queryRunner.dropTable('growing_period');
  }
}
