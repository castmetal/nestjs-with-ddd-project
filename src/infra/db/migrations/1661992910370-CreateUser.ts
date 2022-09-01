import { MigrationInterface, QueryRunner } from 'typeorm';
import configuration from '../../../config/configuration';

export class CreateUser1661992910370 implements MigrationInterface {
  name = 'CreateUser1661992910370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE ${
        configuration().database.schema
      }."user_scope_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE ${
        configuration().database.schema
      }."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(300) NOT NULL, "scope" "public"."user_scope_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON ${
        configuration().database.schema
      }."user" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON ${
        configuration().database.schema
      }."user" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_638bac731294171648258260ff" ON ${
        configuration().database.schema
      }."user" ("password") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
