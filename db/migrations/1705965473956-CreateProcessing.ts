import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProcessing1705965473956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the processing table
    await queryRunner.createTable(
      new Table({
        name: 'processing',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'growing_period_id', type: 'uuid', isNullable: false },
          { name: 'processing_type_id', type: 'uuid', isNullable: false },
          { name: 'machine_id', type: 'uuid', isNullable: false },
          { name: 'date', type: 'date', isNullable: false },
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
      'processing',
      new TableForeignKey({
        columnNames: ['growing_period_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'growing_period',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'processing',
      new TableForeignKey({
        columnNames: ['processing_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'processing_type',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'processing',
      new TableForeignKey({
        columnNames: ['machine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'machine',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys first
    await queryRunner.dropForeignKey(
      'processing',
      'FK_processing_growing_period',
    );
    await queryRunner.dropForeignKey(
      'processing',
      'FK_processing_processing_type',
    );
    await queryRunner.dropForeignKey('processing', 'FK_processing_machine');

    // Drop the processing table
    await queryRunner.dropTable('processing');
  }
}
