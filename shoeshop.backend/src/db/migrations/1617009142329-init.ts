import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617009142329 implements MigrationInterface {
    name = 'init1617009142329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_7020f2db949aec046ff941e1aaa"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_4355dbbef8931576d9e362d4ae1"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "discountPrice" int NOT NULL CONSTRAINT "DF_fa68dd905d7499b04e981a2335e" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_4355dbbef8931576d9e362d4ae1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_7020f2db949aec046ff941e1aaa" FOREIGN KEY ("voucherCodeId") REFERENCES "voucher_code"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_7020f2db949aec046ff941e1aaa"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_4355dbbef8931576d9e362d4ae1"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "DF_fa68dd905d7499b04e981a2335e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "discountPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_4355dbbef8931576d9e362d4ae1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_7020f2db949aec046ff941e1aaa" FOREIGN KEY ("voucherCodeId") REFERENCES "voucher_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
