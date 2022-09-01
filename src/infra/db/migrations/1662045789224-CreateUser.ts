import { MigrationInterface, QueryRunner } from 'typeorm';
import configuration from '../../../config/configuration';

export class CreateUser1662045789224 implements MigrationInterface {
  name = 'CreateUser1662045789224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE ${
        configuration().database.schema
      }."user_scope_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(300) NOT NULL, "scope" ${
        configuration().database.schema
      }."user_scope_enum" NOT NULL DEFAULT 'user', "salt" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_638bac731294171648258260ff" ON "user" ("password") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e2e02f59d9d115d5c6af3739eb" ON "user" ("salt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX ${
        configuration().database.schema
      }."IDX_e2e02f59d9d115d5c6af3739eb"`,
    );
    await queryRunner.query(
      `DROP INDEX ${
        configuration().database.schema
      }."IDX_638bac731294171648258260ff"`,
    );
    await queryRunner.query(
      `DROP INDEX ${
        configuration().database.schema
      }."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(
      `DROP INDEX ${
        configuration().database.schema
      }."IDX_065d4d8f3b5adb4a08841eae3c"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP TYPE ${configuration().database.schema}."user_scope_enum"`,
    );
  }
}
