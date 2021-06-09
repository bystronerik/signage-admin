import { EntityField, EntityAction } from '@core/shared/entity';

export class Entity {
  name: string;
  icon: string;
  fields: EntityField[];
  actions: EntityAction[];
}
