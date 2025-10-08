import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToApiKey1759839417388 implements MigrationInterface {
    name = 'AddDescriptionToApiKey1759839417388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" ADD "description" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD "key" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD "key" character varying(64)`);
        await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "description"`);
    }

}
