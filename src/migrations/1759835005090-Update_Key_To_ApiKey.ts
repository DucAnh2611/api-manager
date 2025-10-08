import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateKeyToApiKey1759835005090 implements MigrationInterface {
    name = 'UpdateKeyToApiKey1759835005090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD "key" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD "key" character varying(64)`);
    }

}
