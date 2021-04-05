import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617592015302 implements MigrationInterface {
    name = 'init1617592015302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "colorId" int`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD "sizeId" int`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "colorId" int`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "sizeId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_ffb99029c767e38b3ae34bb401" ON "cart_item" ("colorId") WHERE "colorId" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_323c1aca27046c408e6d077192" ON "cart_item" ("sizeId") WHERE "sizeId" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_7b161a67b3f1a34754e2213689" ON "order_item" ("colorId") WHERE "colorId" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_b92d3a6017b15d811d4b0c7b78" ON "order_item" ("sizeId") WHERE "sizeId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_ffb99029c767e38b3ae34bb4019" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_323c1aca27046c408e6d0771926" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_7b161a67b3f1a34754e22136897" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_b92d3a6017b15d811d4b0c7b789" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_b92d3a6017b15d811d4b0c7b789"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_7b161a67b3f1a34754e22136897"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_323c1aca27046c408e6d0771926"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_ffb99029c767e38b3ae34bb4019"`);
        await queryRunner.query(`DROP INDEX "REL_b92d3a6017b15d811d4b0c7b78" ON "order_item"`);
        await queryRunner.query(`DROP INDEX "REL_7b161a67b3f1a34754e2213689" ON "order_item"`);
        await queryRunner.query(`DROP INDEX "REL_323c1aca27046c408e6d077192" ON "cart_item"`);
        await queryRunner.query(`DROP INDEX "REL_ffb99029c767e38b3ae34bb401" ON "cart_item"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "sizeId"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "colorId"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "sizeId"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "colorId"`);
    }

}
