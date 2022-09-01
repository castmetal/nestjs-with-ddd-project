import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotExists extends HttpException {
  public name: string;

  constructor() {
    super('UserNotExists', HttpStatus.NOT_FOUND);

    this.name = 'UserNotExists';
  }
}
