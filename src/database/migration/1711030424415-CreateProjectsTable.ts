import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateProjectsTable1711030424415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'projectName',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'projectAdress',
            type: 'varchar',
            length: '128',
            isNullable: false,
          }),
          new TableColumn({
            name: 'codePostal',
            type: 'integer',
            isNullable: false,
          }),
          new TableColumn({
            name: 'city',
            type: 'varchar',
            length: '25',
            isNullable: false,
          }),
          new TableColumn({
            name: 'reference',
            type: 'varchar',
            length: '10',
            isNullable: false,
          }),
          new TableColumn({
            name: 'estimatedstartDate',
            type: 'Date',
            isNullable: false,
          }),
          new TableColumn({
            name: 'startDate',
            type: 'Date',
            isNullable: false,
          }),
          new TableColumn({
            name: 'estimatedEndDate',
            type: 'Date',
            isNullable: false,
          }),
          new TableColumn({
            name: 'endDate',
            type: 'Date',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
