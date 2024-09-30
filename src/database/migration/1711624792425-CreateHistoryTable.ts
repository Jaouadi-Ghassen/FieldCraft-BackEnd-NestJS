import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { ProjectState } from '../../utils/enum/projectState.enum';

export class CreateHistoryTable1711624792425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'history',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'project_id',
            type: 'uuid',
            isNullable: false,
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
            name: 'project_state',
            type: 'enum',
            enum: Object.keys(ProjectState),
          }),
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'history',
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('history');
  }
}
