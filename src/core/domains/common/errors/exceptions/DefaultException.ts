import { HttpException, HttpStatus } from '@nestjs/common';

export class DefaultException extends HttpException {
  public name: string;

  constructor() {
    super('BadGateway', HttpStatus.BAD_GATEWAY);

    this.name = 'DefaultException';
  }
}
