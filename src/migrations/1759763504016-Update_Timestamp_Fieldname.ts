import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTimestampFieldname1759763504016 implements MigrationInterface {
    name = 'UpdateTimestampFieldname1759763504016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_key" ("id" uuid NOT NULL, "appId" uuid NOT NULL, "key" character varying(64), "active" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "revokedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "apiKey"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "api_key" ADD CONSTRAINT "FK_f31a674f6cb84f00b05f7022c88" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_key" DROP CONSTRAINT "FK_f31a674f6cb84f00b05f7022c88"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "configs" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "apps" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "configs" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "apiKey" character varying(64)`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "active" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "apps" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "api_key"`);
    }

}
