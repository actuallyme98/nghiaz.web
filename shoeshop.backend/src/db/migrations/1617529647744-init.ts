import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617529647744 implements MigrationInterface {
    name = 'init1617529647744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_category" DROP CONSTRAINT "FK_ceec9afb7a94e1d36b34a200fa1"`);
        await queryRunner.query(`ALTER TABLE "blog_category" DROP COLUMN "blogsId"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "categoryId" int`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_2585c11fedee21900a332b554a6" FOREIGN KEY ("categoryId") REFERENCES "blog_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_2585c11fedee21900a332b554a6"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "blog_category" ADD "blogsId" int`);
        await queryRunner.query(`ALTER TABLE "blog_category" ADD CONSTRAINT "FK_ceec9afb7a94e1d36b34a200fa1" FOREIGN KEY ("blogsId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
