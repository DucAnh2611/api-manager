import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnConfigsValueType1759650105329 implements MigrationInterface {
    name = 'AddColumnConfigsValueType1759650105329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."configs_valuetype_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "valueType" "public"."configs_valuetype_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "valueType"`);
        await queryRunner.query(`DROP TYPE "public"."configs_valuetype_enum"`);
    }

}
