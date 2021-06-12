import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import {
  AllStylesGQL,
  CreateStyleGQL,
  CreateStyleInput,
  DeleteStyleGQL,
  FindStyleInput,
  OneStyleGQL,
  UpdateStyleGQL,
  UpdateStyleInput,
} from '@core/graphql/style';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {map} from 'rxjs/operators';
import {IEntityService} from '@core/interfaces/entity-service.interface';
import {Style} from '@core/shared/style/style.model';

@Injectable({
  providedIn: 'root',
})
export class StyleService implements IEntityService<Style, FindStyleInput, UpdateStyleInput, CreateStyleInput>{
  constructor(
    private allStylesGQL: AllStylesGQL,
    private oneStyleGQL: OneStyleGQL,
    private createStyleGQL: CreateStyleGQL,
    private updateStyleGQL: UpdateStyleGQL,
    private deleteStyleGQL: DeleteStyleGQL
  ) {}

  findAll(input: FindStyleInput): Observable<any> {
    return this.allStylesGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllStyles));
  }

  find(input: FindStyleInput): QueryRef<any, any> {
    return this.oneStyleGQL.watch({ data: input });
  }

  update(id: string, input: UpdateStyleInput): Observable<FetchResult<any>> {
    return this.updateStyleGQL.mutate({ id, data: input });
  }

  create(input: CreateStyleInput): Observable<FetchResult<any>> {
    return this.createStyleGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteStyleGQL.mutate({ id });
  }
}
