import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateMaterialImagesTable1715259867207
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'materialImage',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'material_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'imagePath',
            type: 'varchar',
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
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'materialImage',
      new TableForeignKey({
        columnNames: ['material_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'materials',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('materialImage');
  }
}
