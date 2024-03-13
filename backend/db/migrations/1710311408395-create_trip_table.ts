import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTripTable1710311408395 implements MigrationInterface {
    name = 'CreateTripTable1710311408395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`trip\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tenNV\` varchar(255) NOT NULL, \`NgayBatDau\` datetime NOT NULL, \`NgayKetThuc\` datetime NOT NULL, \`DiaDiem\` varchar(255) NOT NULL, \`MucDich\` varchar(255) NOT NULL DEFAULT 'textlong', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`positionId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_0ff87b9a148299c5a08ffa08643\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_214bcd0a429256834f9e9cba42f\``);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`positionId\` \`positionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`department\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`employee_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_b832789f77897c539b2fdf8fc64\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_f89812be41bd7d29f98d43445ee\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_0ff87b9a148299c5a08ffa08643\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_214bcd0a429256834f9e9cba42f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_214bcd0a429256834f9e9cba42f\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_0ff87b9a148299c5a08ffa08643\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_f89812be41bd7d29f98d43445ee\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_b832789f77897c539b2fdf8fc64\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``);
        await queryRunner.query(`ALTER TABLE \`employee_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`department\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`positionId\` \`positionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_214bcd0a429256834f9e9cba42f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_0ff87b9a148299c5a08ffa08643\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`trip\``);
    }

}
