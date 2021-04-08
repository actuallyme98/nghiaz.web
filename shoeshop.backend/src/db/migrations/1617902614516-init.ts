import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617902614516 implements MigrationInterface {
    name = 'init1617902614516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voucher" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD "title" nvarchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voucher" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD "title" varchar(50) NOT NULL`);
    }

}
