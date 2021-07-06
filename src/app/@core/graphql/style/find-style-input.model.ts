import { StyleType, StyleValueType } from '@core/shared/style';
import { FindInput } from '@core/graphql/findinput';

export class FindStyleInput extends FindInput {
  name: string;
  type: StyleType;
  valueType: StyleValueType;
}
