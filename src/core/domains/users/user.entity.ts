import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBaseEntity } from '../common/IBaseEntity';
import { UserScopeEnum } from './user.interfaces';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  scope: UserScopeEnum;
};

@Entity()
export class User extends IBaseEntity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    let user = new User(props, id);
    user = user.setProps(user, props);

    return user;
  }

  setProps(user: User, props: UserProps) {
    const values = Object.keys(props);

    for (const item of values) {
      user[item] = props[item];
    }

    return user;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      scope: this.scope,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  @Column({ length: 150 })
  @Index()
  name: string;

  @Column({ length: 120 })
  @Index()
  email: string;

  @Column({ length: 300 })
  @Index()
  password: string;

  @Column({
    type: 'enum',
    enum: UserScopeEnum,
    default: UserScopeEnum.USER,
  })
  scope: UserScopeEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
