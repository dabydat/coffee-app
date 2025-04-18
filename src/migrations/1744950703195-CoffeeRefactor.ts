import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1744950703195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "coffees" RENAME COLUMN "name" TO "title";	       
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "coffees" RENAME COLUMN "title" TO "name";	       
    `);
  }
}
