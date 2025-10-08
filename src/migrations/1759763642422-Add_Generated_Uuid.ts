import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGeneratedUuid1759763642422 implements MigrationInterface {
    name = 'AddGeneratedUuid1759763642422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configs" DROP CONSTRAINT "FK_820201aaa74a238d5f224f7f389"`);
        await queryRunner.query(`ALTER TABLE "api_key" DROP CONSTRAINT "FK_f31a674f6cb84f00b05f7022c88"`);
        await queryRunner.query(`ALTER TABLE "apps" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "configs" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "configs" ADD CONSTRAINT "FK_820201aaa74a238d5f224f7f389" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD CONSTRAINT "FK_f31a674f6cb84f00b05f7022c88" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP CONSTRAINT "FK_f31a674f6cb84f00b05f7022c88"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP CONSTRAINT "FK_820201aaa74a238d5f224f7f389"`);
        await queryRunner.query(`ALTER TABLE "api_key" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "configs" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "apps" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD CONSTRAINT "FK_f31a674f6cb84f00b05f7022c88" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "configs" ADD CONSTRAINT "FK_820201aaa74a238d5f224f7f389" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
