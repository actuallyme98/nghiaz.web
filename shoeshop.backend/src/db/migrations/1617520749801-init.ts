import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617520749801 implements MigrationInterface {
    name = 'init1617520749801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "DF_e9da73f0ea0d7f197aa7884e1aa"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" ADD "image" char(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "status" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "DF_e9da73f0ea0d7f197aa7884e1aa" DEFAULT 1 FOR "status"`);
    }

}
