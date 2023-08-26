import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveId1693028747439 implements MigrationInterface {
    name = 'RemoveId1693028747439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_ad0b75c51246ed530c877978e61"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_a28345a15bab60db58c6741cd4d"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_df98b3b67d24f267266b096ab70"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_eca3c444e67dc91fa2c84b13b5c"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "FK_dbe5850413cdccf311d793f5752"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25fb5a541964bc5cfc18fb13a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d4c3f43fb45ed0040dd2e929f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b1b04dd36f188d633ab3cfcff8"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "REL_dbe5850413cdccf311d793f575"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "PK_d4dee4e7840eb2a047060d1a57e"`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "PK_d8792f65d0568d6e3300233e535" PRIMARY KEY ("uid")`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "donationReceiverId"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "PK_47f2fce52e4596da3c5e3c15d77"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "PK_673a950248e1b88a968d5d88a40" PRIMARY KEY ("uid")`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP COLUMN "donationReceiverId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_ba16fa57ea9c22246f1e3a4a827"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "PK_f16294939afa978b23663c4b04a"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "PK_0349a09ba5ced9b729035f4a585" PRIMARY KEY ("uid")`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "UQ_70e757d013c1291a169a3778b6d" UNIQUE ("userUid")`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_63973e00be28a557a9242d16198" FOREIGN KEY ("userUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_60d98de011ede594d0e35b4e792" FOREIGN KEY ("donationReceiverUid") REFERENCES "donation_receiver"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_1b64ad84d7f3b90a26942111e19" FOREIGN KEY ("userUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_9f97ab0e5f271c164a513b5cfcb" FOREIGN KEY ("donationReceiverUid") REFERENCES "donation_receiver"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "FK_70e757d013c1291a169a3778b6d" FOREIGN KEY ("userUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "FK_70e757d013c1291a169a3778b6d"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_9f97ab0e5f271c164a513b5cfcb"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "FK_1b64ad84d7f3b90a26942111e19"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_60d98de011ede594d0e35b4e792"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_63973e00be28a557a9242d16198"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "UQ_70e757d013c1291a169a3778b6d"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" DROP CONSTRAINT "PK_0349a09ba5ced9b729035f4a585"`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "PK_f16294939afa978b23663c4b04a" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_df955cae05f17b2bcf5045cc021"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_ba16fa57ea9c22246f1e3a4a827" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD "donationReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" DROP CONSTRAINT "PK_673a950248e1b88a968d5d88a40"`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "PK_47f2fce52e4596da3c5e3c15d77" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "donationReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "PK_d8792f65d0568d6e3300233e535"`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "PK_d4dee4e7840eb2a047060d1a57e" PRIMARY KEY ("id", "uid")`);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "REL_dbe5850413cdccf311d793f575" UNIQUE ("userId", "userUid")`);
        await queryRunner.query(`CREATE INDEX "IDX_b1b04dd36f188d633ab3cfcff8" ON "donation_receiver" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1d4c3f43fb45ed0040dd2e929f" ON "stripe_connect_customer" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_25fb5a541964bc5cfc18fb13a8" ON "donation" ("id") `);
        await queryRunner.query(`ALTER TABLE "donation_receiver" ADD CONSTRAINT "FK_dbe5850413cdccf311d793f5752" FOREIGN KEY ("userId", "userUid") REFERENCES "user"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_eca3c444e67dc91fa2c84b13b5c" FOREIGN KEY ("donationReceiverId", "donationReceiverUid") REFERENCES "donation_receiver"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stripe_connect_customer" ADD CONSTRAINT "FK_df98b3b67d24f267266b096ab70" FOREIGN KEY ("userId", "userUid") REFERENCES "user"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_a28345a15bab60db58c6741cd4d" FOREIGN KEY ("donationReceiverId", "donationReceiverUid") REFERENCES "donation_receiver"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_ad0b75c51246ed530c877978e61" FOREIGN KEY ("userId", "userUid") REFERENCES "user"("id","uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
