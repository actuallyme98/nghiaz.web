import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616903311293 implements MigrationInterface {
    name = 'init1616903311293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "REL_3180b06102e839c44f77f7358c" ON "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_3180b06102e839c44f77f7358c" ON "order" ("carrierId") WHERE ([carrierId] IS NOT NULL)`);
    }

}
