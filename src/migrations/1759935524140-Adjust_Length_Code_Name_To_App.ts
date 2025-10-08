import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustLengthCodeNameToApp1759935524140 implements MigrationInterface {
    name = 'AdjustLengthCodeNameToApp1759935524140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps" ADD "code" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "name" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "code"`);
    }

}
