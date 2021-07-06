import { FindInput } from '@core/graphql/findinput';

export class FindUserInput extends FindInput {
  username: string;
  password: string;
  role: string;
}
