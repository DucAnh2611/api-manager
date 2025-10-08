import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveConfigAddApiKeyType1759852039116 implements MigrationInterface {
    name = 'RemoveConfigAddApiKeyType1759852039116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps" ADD "configs" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`CREATE TYPE "public"."api_key_type_enum" AS ENUM('CONFIG', 'THIRD_PARTY')`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD "type" "public"."api_key_type_enum" NOT NULL DEFAULT 'THIRD_PARTY'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."api_key_type_enum"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "configs"`);
    }

}
