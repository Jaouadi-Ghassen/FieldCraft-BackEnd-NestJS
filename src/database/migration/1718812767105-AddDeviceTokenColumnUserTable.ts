import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeviceTokenColumnUserTable1718812767105
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'deviceToken',
        type: 'varchar',
        isNullable: false,
        default: "''",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'deviceToken');
  }
}
