import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617593993351 implements MigrationInterface {
    name = 'init1617593993351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_ffb99029c767e38b3ae34bb4019"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_323c1aca27046c408e6d0771926"`);
        await queryRunner.query(`DROP INDEX "REL_ffb99029c767e38b3ae34bb401" ON "cart_item"`);
        await queryRunner.query(`DROP INDEX "REL_323c1aca27046c408e6d077192" ON "cart_item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_323c1aca27046c408e6d077192" ON "cart_item" ("sizeId") WHERE ([sizeId] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_ffb99029c767e38b3ae34bb401" ON "cart_item" ("colorId") WHERE ([colorId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_323c1aca27046c408e6d0771926" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_ffb99029c767e38b3ae34bb4019" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
