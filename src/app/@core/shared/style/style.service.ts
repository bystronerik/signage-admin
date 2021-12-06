import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import {
  FindAllStylesGQL,
  CreateStyleGQL,
  CreateStyleInput,
  DeleteStyleGQL,
  FindStyleInput,
  FindStyleGQL,
  UpdateStyleGQL,
  UpdateStyleInput,
  Style, FindStyleQuery, FindStyleQueryVariables, UpdateStyleMutation, CreateStyleMutation, DeleteStyleMutation
} from '@app/graphql';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { IEntityService } from '@core/interfaces/entity-service.interface';

@Injectable({
  providedIn: 'root',
})
export class StyleService implements IEntityService<Style, FindStyleInput, UpdateStyleInput, CreateStyleInput> {
  constructor(
    private findAllStylesGQL: FindAllStylesGQL,
    private findStyleGQL: FindStyleGQL,
    private createStyleGQL: CreateStyleGQL,
    private updateStyleGQL: UpdateStyleGQL,
    private deleteStyleGQL: DeleteStyleGQL
  ) {}

  findAll(input: FindStyleInput): Observable<Array<Style>> {
    return this.findAllStylesGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllStyles));
  }

  find(input: FindStyleInput): QueryRef<FindStyleQuery, FindStyleQueryVariables> {
    return this.findStyleGQL.watch({ data: input });
  }

  update(id: string, input: UpdateStyleInput): Observable<FetchResult<UpdateStyleMutation>> {
    return this.updateStyleGQL.mutate({ id, data: input });
  }

  create(input: CreateStyleInput): Observable<FetchResult<CreateStyleMutation>> {
    return this.createStyleGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteStyleMutation>> {
    return this.deleteStyleGQL.mutate({ id });
  }
}
