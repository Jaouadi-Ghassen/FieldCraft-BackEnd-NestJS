import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreatedAtUpdatedAtColumnMaterialTable1716477746316
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('materials', [
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
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('materials', 'created_at');
    await queryRunner.dropColumn('materials', 'updated_at');
  }
}
