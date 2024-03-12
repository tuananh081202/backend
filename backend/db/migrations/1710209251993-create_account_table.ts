import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountTable1710209251993 implements MigrationInterface {
    name = 'CreateAccountTable1710209251993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`avatar\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` int NOT NULL, \`roles\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`CMND\` \`CMND\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`CMND\` \`CMND\` int(20) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
