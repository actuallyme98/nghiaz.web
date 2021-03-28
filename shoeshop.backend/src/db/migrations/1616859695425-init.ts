import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616859695425 implements MigrationInterface {
    name = 'init1616859695425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "cart_item.cart_id", "cartId"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "cartId" int`);
        await queryRunner.query(`ALTER TABLE "cart_item" ALTER COLUMN "cartId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_68cfa141dc4d6303a64e1b74a7" ON "client" ("cartId") WHERE "cartId" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_4355dbbef8931576d9e362d4ae" ON "cart" ("clientId") WHERE "clientId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_68cfa141dc4d6303a64e1b74a79" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_68cfa141dc4d6303a64e1b74a79"`);
        await queryRunner.query(`DROP INDEX "REL_4355dbbef8931576d9e362d4ae" ON "cart"`);
        await queryRunner.query(`DROP INDEX "REL_68cfa141dc4d6303a64e1b74a7" ON "client"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ALTER COLUMN "cartId" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "cartId"`);
        await queryRunner.query(`EXEC sp_rename "cart_item.cartId", "cart_id"`);
    }

}
