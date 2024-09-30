import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddcategoryIdColumnMaterialTable1715769387377
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'materials',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        name: 'FK_category_id_MaterialTable',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'materials',
      'FK_category_id_MaterialTable',
    );
    await queryRunner.dropColumn('materials', 'category_id');
  }
}
