import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1744952208236 implements MigrationInterface {
    name = 'SchemaSync1744952208236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
    }

}
