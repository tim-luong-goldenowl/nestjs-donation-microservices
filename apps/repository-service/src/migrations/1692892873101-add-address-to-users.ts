import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressToUsers1692892873101 implements MigrationInterface {
    name = 'AddAddressToUsers1692892873101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
