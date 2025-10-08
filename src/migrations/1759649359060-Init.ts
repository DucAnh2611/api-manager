import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1759649359060 implements MigrationInterface {
    name = 'Init1759649359060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "apps" ("id" uuid NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(20) NOT NULL, "apiKey" character varying(64), "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_c5121fda0f8268f1f7f84134e19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "configs" ("id" uuid NOT NULL, "appId" uuid NOT NULL, "key" character varying(10) NOT NULL, "value" character varying(20) NOT NULL, "name" character varying(64), "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_002b633ec0d45f5c6f928fea292" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "configs" ADD CONSTRAINT "FK_820201aaa74a238d5f224f7f389" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configs" DROP CONSTRAINT "FK_820201aaa74a238d5f224f7f389"`);
        await queryRunner.query(`DROP TABLE "configs"`);
        await queryRunner.query(`DROP TABLE "apps"`);
    }

}
