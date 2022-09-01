import { HttpException, HttpStatus } from '@nestjs/common';

export class Forbidden extends HttpException {
  public name: string;

  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);

    this.message = `You don't have permission to access this resource`;
    this.name = 'Forbidden';
  }
}
