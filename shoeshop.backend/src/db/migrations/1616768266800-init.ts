import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616768266800 implements MigrationInterface {
    name = 'init1616768266800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "category.image", "thumbnail"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "category.thumbnail", "image"`);
    }

}
