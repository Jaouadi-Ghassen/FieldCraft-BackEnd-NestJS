import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateCategoryTable1715681390793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'parent_id',
            type: 'uuid',
            isNullable: true,
          }),
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'category',
      new TableForeignKey({
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category');
  }
}
// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class CreateCategoryTable1715681390793 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'category',
//         columns: [
//           {
//             name: 'id',
//             type: 'uuid',
//             isPrimary: true,
//             generationStrategy: 'uuid',
//             default: 'gen_random_uuid()',
//           },
//           {
//             name: 'name',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'parent_id',
//             type: 'uuid',
//             isNullable: true,
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'CURRENT_TIMESTAMP',
//           },
//   {
//     name: 'updated_at',
//     type: 'timestamp',
//     default: 'CURRENT_TIMESTAMP',
//     onUpdate: 'CURRENT_TIMESTAMP',
//   },
//         ],
//       }),
//       true,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('category');
//   }
// }
