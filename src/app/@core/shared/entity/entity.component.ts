import { Entity, EntityAction, EntityField } from '@core/shared/entity';
import { EntityFieldBuilder } from '@core/shared/entity/entity-field.builder';
import { EntityActionBuilder } from '@core/shared/entity/entity-action.builder';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { FindInput } from '@core/graphql/findinput';
import { Observable } from 'rxjs';
import { FindStyleInput } from '@core/graphql/style';

export class EntityComponent {

  private readonly service: IEntityService<any, any, any, any>;
  private readonly dataLoader: EntityDataLoader;
  private readonly entity: Entity;

  constructor(service: IEntityService<any, any, any, any>) {
    this.service = service;

    this.dataLoader = new class extends EntityDataLoader {
      public loadItems(input: FindInput): Observable<any> {
        return service.findAll(input);
      }
    };
    this.entity = new Entity();
  }

  public name(name: string): EntityComponent {
    this.entity.name = name;
    return this;
  }

  public icon(icon: string): EntityComponent {
    this.entity.icon = icon;
    return this;
  }

  public field(id: string): EntityFieldBuilder {
    const field = new EntityField(id);
    this.entity.fields.push(field);
    return new EntityFieldBuilder(field);
  }

  public action(): EntityActionBuilder {
    const action = new EntityAction();
    this.entity.actions.push(action);
    return new EntityActionBuilder(action);
  }

  public getEntityStructure(): Entity {
    return this.entity;
  }

  public getEntityDataLoader(): EntityDataLoader {
    return this.dataLoader;
  }

}
