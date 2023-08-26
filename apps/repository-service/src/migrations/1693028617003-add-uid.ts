import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUid1693028617003 implements MigrationInterface {
    name = 'AddUid1693028617003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_063499388657e648418470a439a"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_1753e0d7941483c4da3b76edda9"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_6a084278ee19a4e7a7ab8a00931"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_54910f05337677b9492406763a0"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "FK_47bdfe79921f4958fb0fa0b3eb9"`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82"`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "PK_d4dee4e7840eb2a047060d1a57e" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "userUid" uuid`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "donationReceiverUid" uuid`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "PK_1d4c3f43fb45ed0040dd2e929fe"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "PK_47f2fce52e4596da3c5e3c15d77" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD "userUid" uuid`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD "donationReceiverUid" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_ba16fa57ea9c22246f1e3a4a827" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "PK_b1b04dd36f188d633ab3cfcff85"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "PK_f16294939afa978b23663c4b04a" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD "userUid" uuid`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "REL_47bdfe79921f4958fb0fa0b3eb"`);
        await queryRunner.query(`CREATE INDEX "IDX_d8792f65d0568d6e3300233e53" ON "donation" ("uid") `);
        await queryRunner.query(`CREATE INDEX "IDX_673a950248e1b88a968d5d88a4" ON "stripe_connect_customer" ("uid") `);
        await queryRunner.query(`CREATE INDEX "IDX_df955cae05f17b2bcf5045cc02" ON "user" ("uid") `);
        await queryRunner.query(`CREATE INDEX "IDX_0349a09ba5ced9b729035f4a58" ON "donation_receiver" ("uid") `);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "REL_dbe5850413cdccf311d793f575" UNIQUE ("userId", "userUid")`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_ad0b75c51246ed530c877978e61" FOREIGN KEY ("userId", "userUid") REFERENCES "user"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_a28345a15bab60db58c6741cd4d" FOREIGN KEY ("donationReceiverId", "donationReceiverUid") REFERENCES "donation_receiver"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_df98b3b67d24f267266b096ab70" FOREIGN KEY ("userId", "userUid") REFERENCES "user"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_eca3c444e67dc91fa2c84b13b5c" FOREIGN KEY ("donationReceiverId", "donationReceiverUid") REFERENCES "donation_receiver"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "FK_dbe5850413cdccf311d793f5752" FOREIGN KEY ("userId", "userUid") REFERENCES "user"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "FK_dbe5850413cdccf311d793f5752"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_eca3c444e67dc91fa2c84b13b5c"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_df98b3b67d24f267266b096ab70"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_a28345a15bab60db58c6741cd4d"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_ad0b75c51246ed530c877978e61"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "REL_dbe5850413cdccf311d793f575"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0349a09ba5ced9b729035f4a58"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df955cae05f17b2bcf5045cc02"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_673a950248e1b88a968d5d88a4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8792f65d0568d6e3300233e53"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "REL_47bdfe79921f4958fb0fa0b3eb" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP COLUMN "userUid"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "PK_f16294939afa978b23663c4b04a"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "PK_b1b04dd36f188d633ab3cfcff85" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_ba16fa57ea9c22246f1e3a4a827"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP COLUMN "donationReceiverUid"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP COLUMN "userUid"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "PK_47f2fce52e4596da3c5e3c15d77"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "PK_1d4c3f43fb45ed0040dd2e929fe" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "donationReceiverUid"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "userUid"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "PK_d4dee4e7840eb2a047060d1a57e"`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "FK_47bdfe79921f4958fb0fa0b3eb9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_54910f05337677b9492406763a0" FOREIGN KEY ("donationReceiverId") REFERENCES "donation_receiver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_6a084278ee19a4e7a7ab8a00931" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_1753e0d7941483c4da3b76edda9" FOREIGN KEY ("donationReceiverId") REFERENCES "donation_receiver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_063499388657e648418470a439a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
