export type InvalidField = {
  name: string;
  message: string;
};

export class InvalidFieldsException extends Error {
  public name: string;

  constructor(public readonly fields: InvalidField[]) {
    super();

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      (this as any).__proto__ = new.target.prototype;
    }

    const invalidFields = fields.map((invalidField) => invalidField.name);
    this.message = `Invalid fields: ${invalidFields.join(', ')}`;
    this.name = 'InvalidFieldsException';
  }
}
