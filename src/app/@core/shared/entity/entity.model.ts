import { EntityAction, EntityField, ShowingPlace } from '@core/shared/entity';

export class Entity {
  name: string;
  icon: string;
  readonly fields: EntityField[];
  readonly actions: EntityAction[];

  constructor() {
    this.fields = [];
    this.actions = [];
  }

  public getName(): string {
    return this.name;
  }

  public getIcon(): string {
    return this.icon;
  }

  public getDatagridFields(): EntityField[] {
    return this.getFieldsFor(ShowingPlace.DATAGRID);
  }

  public getFieldsFor(place: ShowingPlace): EntityField[] {
    return this.fields.filter((val) => val.showing.includes(place));
  }

  public getActions(): EntityAction[] {
    return this.actions;
  }

  // TODO přidat EntityComponent, která bude sloužit pro ovládání nastavení, takový builder
  //  a z něj budou dědit komponenty deklarované na modulové urovni
}
