import { User } from '@app/graphql';

export type UserData = User & {
  password: string;
}
