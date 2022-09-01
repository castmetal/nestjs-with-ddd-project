interface IUseCaseErrorError {
  message: string;
}

export abstract class UseCaseError extends Error implements IUseCaseErrorError {
  public readonly message: string;

  constructor(message: string) {
    super();

    this.message = message;
  }
}
