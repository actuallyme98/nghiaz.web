import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616766127104 implements MigrationInterface {
    name = 'init1616766127104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "pk" int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "pk"`);
    }

}
