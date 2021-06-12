import {FindInput} from '@core/graphql/findinput';

export class FindPlayerInput extends FindInput{
  name: string;
  token: string;
  group: string;
}
