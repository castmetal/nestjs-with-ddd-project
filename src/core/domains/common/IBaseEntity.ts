import { PrimaryGeneratedColumn } from 'typeorm';
import { UniqueEntityID } from './UniqueEntityId';
import crypto from 'crypto';

export abstract class IBaseEntity<T> extends UniqueEntityID {
  private props: T;

  constructor(props: T, id?: string) {
    super(id);

    const _id = id ?? crypto.randomUUID();
    this.id = _id;
    this.props = props;
  }

  getProps(): T {
    return this.props;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;
}
