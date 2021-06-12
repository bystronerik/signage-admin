import {FindInput} from '@core/graphql/findinput';

export class FindAlertInput extends FindInput {
  name: string;
  type: string;
  position: string;
  value: string;
}
