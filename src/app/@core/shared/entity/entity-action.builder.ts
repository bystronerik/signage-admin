import { EntityAction } from '@core/shared/entity/entity-action.model';

export class EntityActionBuilder {

  private readonly action: EntityAction;

  constructor(action?: EntityAction) {
    this.action = action ?? new EntityAction();
  }

  name(): EntityActionBuilder {
    return this;
  }

  confirmation(confirmation?: boolean): EntityActionBuilder {
    this.action.confirmation = confirmation ?? true;
    return this;
  }

  callback(callback: (id: string) => void): EntityActionBuilder {
    this.action.callback = callback;
    return this;
  }

  result(): EntityAction {
    return this.action;
  }

}
