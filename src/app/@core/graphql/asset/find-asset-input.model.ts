import {FindInput} from '@core/graphql/findinput';

export class FindAssetInput extends FindInput{
  name: string;
  path: string;
  type: string;
}
