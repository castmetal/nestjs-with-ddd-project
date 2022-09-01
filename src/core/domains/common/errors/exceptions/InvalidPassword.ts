import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPassword extends HttpException {
  public name: string;

  constructor() {
    super('InvalidPassword', HttpStatus.FORBIDDEN);

    this.message = `Password is incorrect, try again later`;
    this.name = 'InvalidPassword';
  }
}
