import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreatedATColumnCategoryTable1716295901715
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'category',
      new TableColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('category', 'created_at');
  }
}
