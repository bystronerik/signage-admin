import { FindInput } from '@core/graphql/findinput';

export class FindAssetListInput extends FindInput {
  name: string;
  type: string;
  prioritized: boolean;
  enabled: boolean;
}
