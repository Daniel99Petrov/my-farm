import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMachine1705963040075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the machine table
    await queryRunner.createTable(
      new Table({
        name: 'machine',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'brand', type: 'varchar', length: '128' },
          { name: 'model', type: 'varchar', length: '128' },
          {
            name: 'registration_number',
            type: 'varchar',
            length: '64',
          },
          { name: 'farm_id', type: 'uuid', isNullable: false },
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

    // Create foreign key
    await queryRunner.createForeignKey(
      'machine',
      new TableForeignKey({
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key first
    await queryRunner.dropForeignKey('machine', 'FK_machine_farm');

    // Drop the machine table
    await queryRunner.dropTable('machine');
  }
}
