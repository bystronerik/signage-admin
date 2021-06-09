import { Validator } from '@angular/forms';

export class EntityField {
  id: string;
  name: string;
  validators: Validator[];
  readonly: boolean;
}
