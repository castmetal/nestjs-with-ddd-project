import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  public name: string;

  constructor() {
    super('UserAlreadyExists', HttpStatus.UNPROCESSABLE_ENTITY);

    this.name = 'UserAlreadyExists';
  }
}
