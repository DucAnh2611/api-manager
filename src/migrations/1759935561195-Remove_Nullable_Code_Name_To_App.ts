import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNullableCodeNameToApp1759935561195 implements MigrationInterface {
    name = 'RemoveNullableCodeNameToApp1759935561195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps" ALTER COLUMN "code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apps" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apps" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "apps" ALTER COLUMN "code" DROP NOT NULL`);
    }

}
