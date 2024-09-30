import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateUserNotificationsTable1714728747096
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_notification',
        columns: [
          new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
          }),
          new TableColumn({
            name: 'notification_id',
            type: 'uuid',
            isPrimary: true,
          }),
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'user_notification',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_notification',
      new TableForeignKey({
        columnNames: ['notification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'notifications',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_notification');
  }
}
