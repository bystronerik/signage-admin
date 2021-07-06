import { EntityField } from '@core/shared/entity/entity-field.model';
import { Validator } from '@angular/forms';
import { ShowingPlace } from '@core/shared/entity/showing-place.enum';

export class EntityFieldBuilder {
  private readonly field: EntityField;

  constructor(field: EntityField | string) {
    if (field instanceof EntityField) {
      this.field = field;
    } else {
      this.field = new EntityField(field);
    }
  }

  name(name: string): EntityFieldBuilder {
    this.field.name = name;
    return this;
  }

  readonly(readonly?: boolean): EntityFieldBuilder {
    this.field.readonly = readonly ?? true;
    return this;
  }

  validator(validator: Validator): EntityFieldBuilder {
    this.field.validators.push(validator);
    return this;
  }

  showAt(place: ShowingPlace): EntityFieldBuilder {
    this.field.showing.push(place);
    return this;
  }

  result(): EntityField {
    return this.field;
  }
}
