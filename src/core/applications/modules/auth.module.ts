import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import configuration from '../../../config/configuration';
import { DatabaseModule } from '../../..//infra/db/database.module';
import { UserRepository } from '../../..//infra/repositories/user.repository';
import { User } from '../../../core/domains/users/user.entity';
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user-use-case';
import { AuthController } from '../../../controllers/http-controllers/auth.controller';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    JwtModule.register({ secret: configuration().security.jwt_secret }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: AuthenticateUserUseCase,
      useFactory: (routeRepo: UserRepository, jwtService: JwtService) => {
        return new AuthenticateUserUseCase(routeRepo, jwtService);
      },
      inject: [UserRepository, JwtService],
    },
  ],
})
export class AuthModule {}
