import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616900360106 implements MigrationInterface {
    name = 'init1616900360106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "code" char(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "code"`);
    }

}
