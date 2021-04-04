import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617530246989 implements MigrationInterface {
    name = 'init1617530246989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_2585c11fedee21900a332b554a6"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_2585c11fedee21900a332b554a6" FOREIGN KEY ("categoryId") REFERENCES "blog_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_2585c11fedee21900a332b554a6"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_2585c11fedee21900a332b554a6" FOREIGN KEY ("categoryId") REFERENCES "blog_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
