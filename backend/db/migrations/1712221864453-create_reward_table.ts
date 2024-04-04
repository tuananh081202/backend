import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRewardTable1712221864453 implements MigrationInterface {
    name = 'CreateRewardTable1712221864453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reward\` (\`id\` int NOT NULL AUTO_INCREMENT, \`MaKhenThuong\` varchar(255) NOT NULL, \`TenKhenThuong\` varchar(255) NOT NULL, \`NgayQuyetDinh\` varchar(255) NOT NULL, \`HinhThuc\` varchar(255) NOT NULL, \`SoTien\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accountId\``);
        await queryRunner.query(`ALTER TABLE \`employee_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_user\` DROP FOREIGN KEY \`FK_c668a68c15f16d05c2a0102a51d\``);
        await queryRunner.query(`ALTER TABLE \`group_user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`group_user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_user\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`resetToken\` \`resetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_b832789f77897c539b2fdf8fc64\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_f89812be41bd7d29f98d43445ee\``);
        await queryRunner.query(`ALTER TABLE \`trip\` CHANGE \`delete_at\` \`delete_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`trip\` CHANGE \`positionId\` \`positionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`trip\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`positionId\` \`positionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`employeetypeId\` \`employeetypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_0ff87b9a148299c5a08ffa08643\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_214bcd0a429256834f9e9cba42f\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`LuongGio\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`LuongGio\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`PhuCap\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`PhuCap\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`ThucLanh\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`ThucLanh\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`TamUng\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`TamUng\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`positionId\` \`positionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`department\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_user\` ADD CONSTRAINT \`FK_c668a68c15f16d05c2a0102a51d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_b832789f77897c539b2fdf8fc64\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_f89812be41bd7d29f98d43445ee\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reward\` ADD CONSTRAINT \`FK_7b3e48d8a28c1d1422f19c60752\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_93af21ecba4fa43c4c63d2456cd\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_059ff623ea9dc92164c2f786cec\` FOREIGN KEY (\`employeetypeId\`) REFERENCES \`employee_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_0ff87b9a148299c5a08ffa08643\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_214bcd0a429256834f9e9cba42f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_214bcd0a429256834f9e9cba42f\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_0ff87b9a148299c5a08ffa08643\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_059ff623ea9dc92164c2f786cec\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_93af21ecba4fa43c4c63d2456cd\``);
        await queryRunner.query(`ALTER TABLE \`reward\` DROP FOREIGN KEY \`FK_7b3e48d8a28c1d1422f19c60752\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_f89812be41bd7d29f98d43445ee\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_b832789f77897c539b2fdf8fc64\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``);
        await queryRunner.query(`ALTER TABLE \`group_user\` DROP FOREIGN KEY \`FK_c668a68c15f16d05c2a0102a51d\``);
        await queryRunner.query(`ALTER TABLE \`department\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`positionId\` \`positionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`TamUng\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`TamUng\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`ThucLanh\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`ThucLanh\` int(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`PhuCap\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`PhuCap\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP COLUMN \`LuongGio\``);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD \`LuongGio\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_214bcd0a429256834f9e9cba42f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_0ff87b9a148299c5a08ffa08643\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`employeetypeId\` \`employeetypeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`positionId\` \`positionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trip\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trip\` CHANGE \`positionId\` \`positionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trip\` CHANGE \`delete_at\` \`delete_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_f89812be41bd7d29f98d43445ee\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_b832789f77897c539b2fdf8fc64\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`resetToken\` \`resetToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_user\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`group_user\` ADD CONSTRAINT \`FK_c668a68c15f16d05c2a0102a51d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`accountId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`reward\``);
    }

}
