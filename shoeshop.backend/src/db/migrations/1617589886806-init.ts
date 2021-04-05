import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617589886806 implements MigrationInterface {
    name = 'init1617589886806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "vat"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "vat" int NOT NULL`);
    }

}
