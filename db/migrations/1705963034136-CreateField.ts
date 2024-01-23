import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateField1705963034136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the field table
    await queryRunner.createTable(
      new Table({
        name: 'field',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar', length: '128' },
          { name: 'borders', type: 'jsonb' },
          { name: 'farm_id', type: 'uuid', isNullable: false },
          { name: 'soil_id', type: 'uuid', isNullable: false },
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
      'field',
      new TableForeignKey({
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'field',
      new TableForeignKey({
        columnNames: ['soil_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'soil',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys first
    await queryRunner.dropForeignKey('field', 'FK_field_farm');
    await queryRunner.dropForeignKey('field', 'FK_field_soil');

    // Drop the field table
    await queryRunner.dropTable('field');
  }
}
