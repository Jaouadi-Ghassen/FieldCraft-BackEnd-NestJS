import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { UserRole } from '../../utils/enum/userRole.enum';

export class CreateUserTable1710409930019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'username',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'firstname',
            type: 'varchar',
            length: '25',
            isNullable: false,
          }),
          new TableColumn({
            name: 'lastname',
            type: 'varchar',
            length: '25',
            isNullable: false,
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: false,
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'adresse',
            type: 'varchar',
            length: '32',
            isNullable: false,
          }),
          new TableColumn({
            name: 'image',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'isdeleted',
            type: 'boolean',
            isNullable: false,
            default: false,
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
            name: 'role',
            type: 'enum',
            enum: Object.keys(UserRole),
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
