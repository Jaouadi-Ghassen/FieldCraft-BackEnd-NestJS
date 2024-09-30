import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTasksTable1711536037065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'taskName',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'taskState',
            type: 'boolean',
            default: false,
          }),
          new TableColumn({
            name: 'resetProject',
            type: 'boolean',
            default: false,
          }),
          new TableColumn({
            name: 'taskPhase',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          }),
          new TableColumn({
            name: 'project_id',
            type: 'uuid',
            isNullable: false,
          }),
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
