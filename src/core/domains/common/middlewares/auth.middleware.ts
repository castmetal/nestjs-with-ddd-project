import { createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import configuration from '../../../../config/configuration';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res: Response, next: NextFunction) {
    let getAuthorizerHeader =
      req.headers[configuration().authorization.header.toLowerCase()];

    getAuthorizerHeader = getAuthorizerHeader
      ? getAuthorizerHeader.toString()
      : '';

    const jwtService = new JwtService({
      secret: configuration().security.jwt_secret,
    });

    if (getAuthorizerHeader !== '') {
      const decodeJwtAuthorizer = JSON.parse(
        JSON.stringify(jwtService.decode(getAuthorizerHeader)),
      );

      req.userScope = decodeJwtAuthorizer.scope;

      req.headers['request-id'] = randomUUID();
    }

    next();
  }
}

export const UserScopeDecorator = createParamDecorator((data, req) => {
  return req.args[0].userScope;
});
