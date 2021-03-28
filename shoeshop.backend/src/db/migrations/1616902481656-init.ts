import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616902481656 implements MigrationInterface {
    name = 'init1616902481656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "REL_904370c093ceea4369659a3c81" ON "order_item"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_3180b06102e839c44f77f7358c" ON "order" ("carrierId") WHERE "carrierId" IS NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "REL_3180b06102e839c44f77f7358c" ON "order"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_904370c093ceea4369659a3c81" ON "order_item" ("productId") WHERE ([productId] IS NOT NULL)`);
    }

}
