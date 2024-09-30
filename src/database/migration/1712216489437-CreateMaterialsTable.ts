import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { MaterialState } from '../../utils/enum/materialState.enum';

export class CreateMaterialsTable1712216489437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'materials',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'materialName',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'price',
            type: 'integer',
            isNullable: false,
          }),
          new TableColumn({
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'material_state',
            type: 'enum',
            enum: Object.keys(MaterialState),
          }),
          new TableColumn({
            name: 'created_by_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'project_id',
            type: 'uuid',
            isNullable: false,
          }),
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['created_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('materials');
  }
}
