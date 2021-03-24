import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616579991513 implements MigrationInterface {
    name = 'init1616579991513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" char(50) NOT NULL CONSTRAINT "DF_97672ac88f789774dd47f7c8be3" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }

}
