import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617603322166 implements MigrationInterface {
    name = 'init1617603322166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "reason" ntext NOT NULL CONSTRAINT "DF_0eb8e748bf7a14ca46014f0ddf5" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "DF_0eb8e748bf7a14ca46014f0ddf5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "reason" nvarchar(100) NOT NULL`);
    }

}
