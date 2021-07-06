import { TagColor } from '@core/shared/tag';
import { FindInput } from '@core/graphql/findinput';

export class FindTagInput extends FindInput {
  name: string;
  color: TagColor;
}
