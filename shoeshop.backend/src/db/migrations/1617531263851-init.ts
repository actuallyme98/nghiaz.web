import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617531263851 implements MigrationInterface {
    name = 'init1617531263851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "short_description"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "short_description" ntext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "short_description"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "short_description" nvarchar(150) NOT NULL`);
    }

}
