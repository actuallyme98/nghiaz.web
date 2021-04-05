import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617603506068 implements MigrationInterface {
    name = 'init1617603506068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "reason" nvarchar(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "reason" nvarchar(100) NOT NULL`);
    }

}
