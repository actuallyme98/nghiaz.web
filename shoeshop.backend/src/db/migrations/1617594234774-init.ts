import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617594234774 implements MigrationInterface {
    name = 'init1617594234774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_7b161a67b3f1a34754e22136897"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_b92d3a6017b15d811d4b0c7b789"`);
        await queryRunner.query(`DROP INDEX "REL_75db0de134fe0f9fe9e4591b7b" ON "cart_item"`);
        await queryRunner.query(`DROP INDEX "REL_7b161a67b3f1a34754e2213689" ON "order_item"`);
        await queryRunner.query(`DROP INDEX "REL_b92d3a6017b15d811d4b0c7b78" ON "order_item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_b92d3a6017b15d811d4b0c7b78" ON "order_item" ("sizeId") WHERE ([sizeId] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_7b161a67b3f1a34754e2213689" ON "order_item" ("colorId") WHERE ([colorId] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_75db0de134fe0f9fe9e4591b7b" ON "cart_item" ("productId") WHERE ([productId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_b92d3a6017b15d811d4b0c7b789" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_7b161a67b3f1a34754e22136897" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
