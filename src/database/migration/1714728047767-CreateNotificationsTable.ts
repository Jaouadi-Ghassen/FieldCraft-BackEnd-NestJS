import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateNotificationsTable1714728047767
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'title',
            type: 'varchar',
            length: '25',
            isNullable: false,
          }),
          new TableColumn({
            name: 'subTitle',
            type: 'varchar',
            length: '25',
            isNullable: false,
          }),
          new TableColumn({
            name: 'content',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'isOpen',
            type: 'boolean',
            isNullable: false,
            default: false,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
