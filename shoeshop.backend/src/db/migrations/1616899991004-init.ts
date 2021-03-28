import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616899991004 implements MigrationInterface {
    name = 'init1616899991004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carrier" ("created_at" datetime NOT NULL CONSTRAINT "DF_7499970f4d8e868101ef123cf54" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_b2ac191803dcb7101c536144beb" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, "method" nvarchar(50) NOT NULL, "fee" int NOT NULL, "description" nvarchar(50) NOT NULL, CONSTRAINT "PK_f615ebd1906f0270d41b3a5a8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("created_at" datetime NOT NULL CONSTRAINT "DF_66561ef057388238c0522e66834" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_2674c30eac9803918984027d764" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "amount" int NOT NULL, "productId" int, "orderId" int, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_904370c093ceea4369659a3c81" ON "order_item" ("productId") WHERE "productId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shipping_fee"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "clone" int NOT NULL CONSTRAINT "DF_443e61ecd7cbc2e891607a94ddd" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "order" ADD "clientId" int`);
        await queryRunner.query(`ALTER TABLE "order" ADD "carrierId" int`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "DF_7a9573d6a1fb982772a91233205"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" char(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "cityId" int`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "districtId" int`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "wardId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_75db0de134fe0f9fe9e4591b7b" ON "cart_item" ("productId") WHERE "productId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_46c7dd14073310a8f733d5cb3a9" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_c01f3cc5fd641bf0784510eb4d5" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9ba869b4b0dc3e85654051bc6ab" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_3180b06102e839c44f77f7358cb" FOREIGN KEY ("carrierId") REFERENCES "carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_3180b06102e839c44f77f7358cb"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9ba869b4b0dc3e85654051bc6ab"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_c01f3cc5fd641bf0784510eb4d5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_46c7dd14073310a8f733d5cb3a9"`);
        await queryRunner.query(`DROP INDEX "REL_75db0de134fe0f9fe9e4591b7b" ON "cart_item"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "wardId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "districtId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "cityId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "DF_7a9573d6a1fb982772a91233205" DEFAULT 1 FOR "status"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "carrierId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "DF_443e61ecd7cbc2e891607a94ddd"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "clone"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "shipping_fee" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "client_id" int NOT NULL`);
        await queryRunner.query(`DROP INDEX "REL_904370c093ceea4369659a3c81" ON "order_item"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "carrier"`);
    }

}
