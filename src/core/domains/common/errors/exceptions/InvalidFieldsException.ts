import { UseCaseError } from '../useCaseError';

export type InvalidField = {
  name: string;
  message: string;
};

export class InvalidFieldsException extends UseCaseError {
  public name: string;
  public message: string;

  constructor(public readonly fields: InvalidField[]) {
    const invalidFields = fields.map((invalidField) => invalidField.name);
    const invalidFieldsErrorMessage = `Invalid fields: ${invalidFields.join(
      ', ',
    )}`;

    super(invalidFieldsErrorMessage);

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      (this as any).__proto__ = new.target.prototype;
    }

    this.message = invalidFieldsErrorMessage;
    this.name = 'InvalidFieldsException';
  }
}
