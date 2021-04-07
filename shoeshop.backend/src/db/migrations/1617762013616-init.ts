import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617762013616 implements MigrationInterface {
    name = 'init1617762013616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("created_at" datetime NOT NULL CONSTRAINT "DF_5655225a1b5dc278f91511bfe58" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_1611bff648370477d5d0a6156c9" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "from" nvarchar(50) NOT NULL, "email" char(40) NOT NULL, "phone" char(20) NOT NULL, "address" ntext NOT NULL, "content" ntext NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
