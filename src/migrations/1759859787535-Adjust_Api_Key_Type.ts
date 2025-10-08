import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustApiKeyType1759859787535 implements MigrationInterface {
    name = 'AdjustApiKeyType1759859787535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."api_key_type_enum" RENAME TO "api_key_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."api_key_type_enum" AS ENUM('CONFIG', 'UP_CONFIG', 'THIRD_PARTY')`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "type" TYPE "public"."api_key_type_enum" USING "type"::"text"::"public"."api_key_type_enum"`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "type" SET DEFAULT 'THIRD_PARTY'`);
        await queryRunner.query(`DROP TYPE "public"."api_key_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."api_key_type_enum_old" AS ENUM('CONFIG', 'THIRD_PARTY')`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "type" TYPE "public"."api_key_type_enum_old" USING "type"::"text"::"public"."api_key_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "type" SET DEFAULT 'THIRD_PARTY'`);
        await queryRunner.query(`DROP TYPE "public"."api_key_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."api_key_type_enum_old" RENAME TO "api_key_type_enum"`);
    }

}
