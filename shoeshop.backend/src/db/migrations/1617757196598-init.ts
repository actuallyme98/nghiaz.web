import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617757196598 implements MigrationInterface {
    name = 'init1617757196598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_0bea7da1bb75c6b1f28617b42d5"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_0bea7da1bb75c6b1f28617b42d5" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_0bea7da1bb75c6b1f28617b42d5"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_0bea7da1bb75c6b1f28617b42d5" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
