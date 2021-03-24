import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616612216639 implements MigrationInterface {
    name = 'init1616612216639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "product_image.product_id", "productId"`);
        await queryRunner.query(`EXEC sp_rename "product_video.product_id", "productId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "product_image" ALTER COLUMN "productId" int`);
        await queryRunner.query(`ALTER TABLE "product_video" ALTER COLUMN "productId" int`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_video" ADD CONSTRAINT "FK_cdc94e1384be913b439c8fbd3c1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_video" DROP CONSTRAINT "FK_cdc94e1384be913b439c8fbd3c1"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`ALTER TABLE "product_video" ALTER COLUMN "productId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_image" ALTER COLUMN "productId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "address" ntext NOT NULL`);
        await queryRunner.query(`EXEC sp_rename "product_video.productId", "product_id"`);
        await queryRunner.query(`EXEC sp_rename "product_image.productId", "product_id"`);
    }

}
