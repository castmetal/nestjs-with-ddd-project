interface IError {
  message: string;
}

export abstract class DomainError extends Error implements IError {
  public readonly message: string;

  constructor(message: string) {
    super();

    this.message = message;
  }
}
