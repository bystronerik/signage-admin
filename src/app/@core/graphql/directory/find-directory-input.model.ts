import { FindInput } from '@core/graphql/findinput';

export class FindDirectoryInput extends FindInput {
  name: string;
  parentDirectory: string;
}
