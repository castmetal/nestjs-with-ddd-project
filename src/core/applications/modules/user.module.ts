import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import configuration from '../../../config/configuration';
import { UserController } from '../../..//controllers/http-controllers';
import { UserService } from '../services/user.service';
import { DatabaseModule } from '../../..//infra/db/database.module';
import { UserRepository } from '../../..//infra/repositories/user.repository';
import { User } from '../../../core/domains/users/user.entity';
import { CreateUserUseCase } from '../use-cases/create-user-use-case';
import { ListAllUsersUseCase } from '../use-cases/list-all-users-use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (routeRepo: UserRepository) => {
        return new CreateUserUseCase(routeRepo);
      },
      inject: [UserRepository],
    },
    {
      provide: ListAllUsersUseCase,
      useFactory: (routeRepo: UserRepository) => {
        return new ListAllUsersUseCase(routeRepo);
      },
      inject: [UserRepository],
    },
  ],
})
export class UserModule {}
