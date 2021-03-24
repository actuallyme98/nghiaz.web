import {MigrationInterface, QueryRunner} from "typeorm";

export class init1616597317980 implements MigrationInterface {
    name = 'init1616597317980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" datetime NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_6d596d799f9cb9dac6f7bf7c23c" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "username" char(60) NOT NULL, "email" char(50) NOT NULL CONSTRAINT "DF_97672ac88f789774dd47f7c8be3" DEFAULT '', "password" char(128) NOT NULL, "is_supperuser" int NOT NULL CONSTRAINT "DF_0806dc1a9d94e82da48712310d2" DEFAULT 0, "first_name" nvarchar(60) NOT NULL, "last_name" nvarchar(60) NOT NULL, "clientId" int, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_6c3a73bbc9d8a8082816adc870" ON "users" ("clientId") WHERE "clientId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "mail" ("created_at" datetime NOT NULL CONSTRAINT "DF_4a56759c02c72702ecb9c9d9eed" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_4d80ea8ebac51d7204f1de29ca6" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_5407da42b983ba54c6c62d462d3" DEFAULT NEWSEQUENTIALID(), "status" char(30) NOT NULL CONSTRAINT "DF_8c9d394edbb8aaed6f924e11198" DEFAULT 'pending', "type" char(30) NOT NULL, "send_from" varchar(255) NOT NULL, "send_to" varchar(255) NOT NULL, "subject" varchar(255) NOT NULL, "content" varchar(1000) NOT NULL, "retry" int NOT NULL CONSTRAINT "DF_7d6ce2732a33541a8c2c14953c8" DEFAULT 3, CONSTRAINT "PK_5407da42b983ba54c6c62d462d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("created_at" datetime NOT NULL CONSTRAINT "DF_dff2bd18e8bb11a0300d4a624c9" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_e302377d50550b1b13853825736" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(30) NOT NULL, "image" char(150) NOT NULL, "slug" char(30) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("created_at" datetime NOT NULL CONSTRAINT "DF_60ff27bbe4002d0da0da7801087" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_30ed5429ba71049444b64174bdf" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "code" int NOT NULL, "name" nvarchar(50) NOT NULL, "is_active" int NOT NULL, CONSTRAINT "UQ_b94ae715aad0d13e62f585ff11b" UNIQUE ("code"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("created_at" datetime NOT NULL CONSTRAINT "DF_9841844ab2a315a156e3ebd1aa2" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_60c73ce2df2afd0c95772e50f97" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "gender" char(10) NOT NULL CONSTRAINT "DF_2e9b205e33d98be246af7268984" DEFAULT 'UNDEFINED', "avatar" char(150) NOT NULL CONSTRAINT "DF_b8555f8747775704ab1bd50ac2f" DEFAULT '', "dob" char(30) NOT NULL CONSTRAINT "DF_a93a540a90e68f43791eb9f3fcc" DEFAULT '', CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("created_at" datetime NOT NULL CONSTRAINT "DF_051b1d1b086448bd29602a41a5f" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_b53eaf94eaeaf84e6b1cf2d770a" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_address" ("created_at" datetime NOT NULL CONSTRAINT "DF_1b14b93ed0ef3813e9a40fb83e4" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_f4083f8efc5b0be348c71d89597" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "full_name" nvarchar(100) NOT NULL, "phone" char(20) NOT NULL, "address" ntext NOT NULL, "is_default" int NOT NULL CONSTRAINT "DF_837acc73285d1ffc15acbf0b2ab" DEFAULT 0, "clientId" int, "cityId" int, "districtId" int, "wardId" int, CONSTRAINT "PK_00581098daef1f881bb3d17a0cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "district" ("created_at" datetime NOT NULL CONSTRAINT "DF_cf89c2c860d2c4398d9f35c5dd3" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_671fa8036158877c6091ed9cac6" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "city_id" int NOT NULL, "code" int NOT NULL, "name" nvarchar(50) NOT NULL, "is_active" int NOT NULL, CONSTRAINT "UQ_fbfe5cb0d22c2be8c9a9fff5b6b" UNIQUE ("code"), CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "material" ("created_at" datetime NOT NULL CONSTRAINT "DF_626f5350173539ba1cf2663f9b2" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_2dc2eec957274b279ee88143251" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(30) NOT NULL, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "origin" ("created_at" datetime NOT NULL CONSTRAINT "DF_b84376b2af7b98c0e633696a6c1" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_efd4f9dd96fb0c96d7149ab6c2e" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(30) NOT NULL, CONSTRAINT "PK_f6e2cbfad6d4ed0a9cb9bb8de95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("created_at" datetime NOT NULL CONSTRAINT "DF_c6e82cb9f5ce1267829e61da6ed" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_f3f4e069c153c6e9530355f1216" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "product_id" int NOT NULL, "url" char(150) NOT NULL, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_video" ("created_at" datetime NOT NULL CONSTRAINT "DF_1831c81ce12d8df9dc335615223" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_25d39daf3d68aebca76172d37fa" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "product_id" int NOT NULL, "url" char(150) NOT NULL, "thumbnail" char(150) NOT NULL, "youtube_url" char(150) NOT NULL, CONSTRAINT "PK_9769e5e31c1906083b7d2502da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" datetime NOT NULL CONSTRAINT "DF_91b4f645f7fe267179af692bf09" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_4a5ee402c3f5d53ce5c768da158" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "code" char(20) NOT NULL, "name" nvarchar(100) NOT NULL, "address" ntext NOT NULL, "price" int NOT NULL, "discount_price" int NOT NULL, "current_price" int NOT NULL, "is_special" int NOT NULL, "is_sell_well" int NOT NULL, "status" int NOT NULL CONSTRAINT "DF_01286e06a0554cbb19375f0178c" DEFAULT 1, "thumbnail" char(150) NOT NULL, "slug" char(100) NOT NULL, "short_description" nvarchar(150) NOT NULL, "description" ntext NOT NULL, "body_detail" nvarchar(150) NOT NULL, "sole_detail" nvarchar(150) NOT NULL, "priority" int NOT NULL, "quantity" int NOT NULL, "vat" int NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "size" ("created_at" datetime NOT NULL CONSTRAINT "DF_04f681ab6e96d4e8632331e4a06" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_4db51187cc2cac70b5778c1e44a" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" int NOT NULL, CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("created_at" datetime NOT NULL CONSTRAINT "DF_7561a113607b9a3804c895442aa" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_12e318242b90834fb3b94c5654d" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "code" char(20) NOT NULL, "name" nvarchar(30) NOT NULL, "status" int NOT NULL CONSTRAINT "DF_261bd1495d4d3e29802752471fd" DEFAULT 1, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ward" ("created_at" datetime NOT NULL CONSTRAINT "DF_85c34eace8bab6759e3fcdcf84a" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_fb511c2b3b3cf5b2c7629f60abe" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "district_id" int NOT NULL, "code" int NOT NULL, "name" nvarchar(50) NOT NULL, "is_active" int NOT NULL, CONSTRAINT "UQ_14bd787455693efede59d248a7d" UNIQUE ("code"), CONSTRAINT "PK_e6725fa4a50e449c4352d2230e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item" ("created_at" datetime NOT NULL CONSTRAINT "DF_05cd6882ee1cb14b09f7986d55e" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_9c81cb1a0550b62ec99cb93b7f8" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "cart_id" int NOT NULL, "amount" int NOT NULL, "productId" int, CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flash_sale" ("created_at" datetime NOT NULL CONSTRAINT "DF_ab19ce01ce48b58f4d8bc7104eb" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_c9b8fcda34e63a76a185d9c3693" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "title" nvarchar(100) NOT NULL, "start_date" char(30) NOT NULL, "end_date" char(30) NOT NULL, "status" int NOT NULL CONSTRAINT "DF_68d983672d45a617b6fbbc0423f" DEFAULT 1, CONSTRAINT "PK_0ca3636f18f85dce0d2b800a7fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flash_sale_item" ("created_at" datetime NOT NULL CONSTRAINT "DF_e6e1a9b0a30f5f6daf34392caf3" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_458a333b95b05982b3a60832963" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "flash_sale_id" int NOT NULL, "sale_price" int NOT NULL, "quantity" int NOT NULL, "sold_quantity" int NOT NULL, "product_id" int, CONSTRAINT "PK_2ac37fab8feb8cdb1a2d5649651" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("created_at" datetime NOT NULL CONSTRAINT "DF_e53d92730ba8bd3bd87e73b076b" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_faa05c6206e7196b91251712625" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "client_id" int NOT NULL, "status" int NOT NULL CONSTRAINT "DF_7a9573d6a1fb982772a91233205" DEFAULT 1, "reason" nvarchar(100) NOT NULL, "description" ntext NOT NULL, "price" int NOT NULL, "shipping_fee" int NOT NULL, "payment_method" char(20) NOT NULL, "name" nvarchar(30) NOT NULL, "phone" char(20) NOT NULL, "address" ntext NOT NULL, "wardId" int NOT NULL, "districtId" int NOT NULL, "cityId" int NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("created_at" datetime NOT NULL CONSTRAINT "DF_d1a5ca9d3724c305b6694df08b1" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_b28774f0f9272aee03790561374" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "title" nvarchar(150) NOT NULL, "status" int NOT NULL CONSTRAINT "DF_e9da73f0ea0d7f197aa7884e1aa" DEFAULT 1, "thumbnail" char(150) NOT NULL, "short_description" nvarchar(150) NOT NULL, "description" ntext NOT NULL, "slug" char(100) NOT NULL, "image" char(150) NOT NULL, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_category" ("created_at" datetime NOT NULL CONSTRAINT "DF_982e13e125062efd6551112b1a8" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_46d10068aa404ec617abec558cc" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, "slug" char(50) NOT NULL, CONSTRAINT "PK_32b67ddf344608b5c2fb95bc90c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("created_at" datetime NOT NULL CONSTRAINT "DF_318fef55b3acc61bc8083ffe6ba" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_7647c6e6b918b92d0d5e7253b43" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "clientId" int, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voucher_code" ("created_at" datetime NOT NULL CONSTRAINT "DF_e1d292ceb92e1b80c15c1f56d9d" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_1aa780bf85fb64809cbe70be648" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "voucher_id" int NOT NULL, "code" char(30) NOT NULL, "status" int NOT NULL CONSTRAINT "DF_db0722d9dede46fae977208dfa0" DEFAULT 1, "is_used" int NOT NULL, CONSTRAINT "PK_ee60c59dedf99dfc18553762034" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voucher" ("created_at" datetime NOT NULL CONSTRAINT "DF_7a511bf6a8227ede24395560d77" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_64f80f5d56bb56e9c986664053c" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "title" varchar(50) NOT NULL, "start_date" char(30) NOT NULL, "end_date" char(30) NOT NULL, "percent_discount" int NOT NULL, "amount" int NOT NULL, "max_amount" int NOT NULL, "status" int NOT NULL CONSTRAINT "DF_cd7f3d24f8670b352454de63f26" DEFAULT 1, "quantity" int NOT NULL, "require_max_price" int NOT NULL, "require_min_price" int NOT NULL, CONSTRAINT "PK_677ae75f380e81c2f103a57ffaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_sizes_size" ("productId" int NOT NULL, "sizeId" int NOT NULL, CONSTRAINT "PK_92f139ef951e2ab39986aa6d443" PRIMARY KEY ("productId", "sizeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c363d4050056518c07348e8a27" ON "product_sizes_size" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a7bd6fac9cf96620ec68761ef3" ON "product_sizes_size" ("sizeId") `);
        await queryRunner.query(`CREATE TABLE "product_colors_color" ("productId" int NOT NULL, "colorId" int NOT NULL, CONSTRAINT "PK_e0f1b1202fef01dce9c58f5f23b" PRIMARY KEY ("productId", "colorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11df73505d065b93f4080cadb6" ON "product_colors_color" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b8ba9cf68f6cb0ed6282a5c10" ON "product_colors_color" ("colorId") `);
        await queryRunner.query(`CREATE TABLE "product_categories_category" ("productId" int NOT NULL, "categoryId" int NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_0bea7da1bb75c6b1f28617b42d5" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_ef5c0761dcb0482a2068f011b13" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_c8cb6d80c25f9d5a7bc37ccd61d" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_a4fbbd570c419e9abb49ddff878" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flash_sale_item" ADD CONSTRAINT "FK_e711e0021e4d125fdf6a5d36895" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_4355dbbef8931576d9e362d4ae1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" ADD CONSTRAINT "FK_c363d4050056518c07348e8a27e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" ADD CONSTRAINT "FK_a7bd6fac9cf96620ec68761ef3b" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" ADD CONSTRAINT "FK_11df73505d065b93f4080cadb60" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" ADD CONSTRAINT "FK_8b8ba9cf68f6cb0ed6282a5c101" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" DROP CONSTRAINT "FK_8b8ba9cf68f6cb0ed6282a5c101"`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" DROP CONSTRAINT "FK_11df73505d065b93f4080cadb60"`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" DROP CONSTRAINT "FK_a7bd6fac9cf96620ec68761ef3b"`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" DROP CONSTRAINT "FK_c363d4050056518c07348e8a27e"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_4355dbbef8931576d9e362d4ae1"`);
        await queryRunner.query(`ALTER TABLE "flash_sale_item" DROP CONSTRAINT "FK_e711e0021e4d125fdf6a5d36895"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_a4fbbd570c419e9abb49ddff878"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_c8cb6d80c25f9d5a7bc37ccd61d"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_ef5c0761dcb0482a2068f011b13"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_0bea7da1bb75c6b1f28617b42d5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e"`);
        await queryRunner.query(`DROP INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category"`);
        await queryRunner.query(`DROP INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category"`);
        await queryRunner.query(`DROP TABLE "product_categories_category"`);
        await queryRunner.query(`DROP INDEX "IDX_8b8ba9cf68f6cb0ed6282a5c10" ON "product_colors_color"`);
        await queryRunner.query(`DROP INDEX "IDX_11df73505d065b93f4080cadb6" ON "product_colors_color"`);
        await queryRunner.query(`DROP TABLE "product_colors_color"`);
        await queryRunner.query(`DROP INDEX "IDX_a7bd6fac9cf96620ec68761ef3" ON "product_sizes_size"`);
        await queryRunner.query(`DROP INDEX "IDX_c363d4050056518c07348e8a27" ON "product_sizes_size"`);
        await queryRunner.query(`DROP TABLE "product_sizes_size"`);
        await queryRunner.query(`DROP TABLE "voucher"`);
        await queryRunner.query(`DROP TABLE "voucher_code"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "blog_category"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "flash_sale_item"`);
        await queryRunner.query(`DROP TABLE "flash_sale"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
        await queryRunner.query(`DROP TABLE "ward"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "size"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_video"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "origin"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP TABLE "delivery_address"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "mail"`);
        await queryRunner.query(`DROP INDEX "REL_6c3a73bbc9d8a8082816adc870" ON "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
