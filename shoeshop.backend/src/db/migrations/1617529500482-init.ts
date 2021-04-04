import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617529500482 implements MigrationInterface {
    name = 'init1617529500482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_category" ADD "blogsId" int`);
        await queryRunner.query(`ALTER TABLE "blog_category" ADD CONSTRAINT "FK_ceec9afb7a94e1d36b34a200fa1" FOREIGN KEY ("blogsId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_category" DROP CONSTRAINT "FK_ceec9afb7a94e1d36b34a200fa1"`);
        await queryRunner.query(`ALTER TABLE "blog_category" DROP COLUMN "blogsId"`);
    }

}
