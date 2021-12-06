import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  FindAllAlertsGQL,
  CreateAlertGQL,
  CreateAlertInput,
  FindAlertInput,
  FindAlertGQL,
  UpdateAlertGQL,
  UpdateAlertInput,
  DeleteAlertGQL,
  Alert, FindAlertQuery, FindAlertQueryVariables, UpdateAlertMutation, CreateAlertMutation, DeleteAlertMutation
} from '@app/graphql';
import { map } from 'rxjs/operators';
import { IEntityService } from '@core/interfaces/entity-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService implements IEntityService<Alert, FindAlertInput, UpdateAlertInput, CreateAlertInput> {
  constructor(
    private findAllAlertsGQL: FindAllAlertsGQL,
    private findAlertGQL: FindAlertGQL,
    private createAlertGQL: CreateAlertGQL,
    private updateAlertGQL: UpdateAlertGQL,
    private deleteAlertGQL: DeleteAlertGQL
  ) {}

  findAll(input: FindAlertInput): Observable<Array<Partial<Alert>>> {
    return this.findAllAlertsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllAlerts));
  }

  find(input: FindAlertInput): QueryRef<FindAlertQuery, FindAlertQueryVariables> {
    return this.findAlertGQL.watch({ data: input });
  }

  update(id: string, input: UpdateAlertInput): Observable<FetchResult<UpdateAlertMutation>> {
    return this.updateAlertGQL.mutate({ id, data: input });
  }

  create(input: CreateAlertInput): Observable<FetchResult<CreateAlertMutation>> {
    return this.createAlertGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteAlertMutation>> {
    return this.deleteAlertGQL.mutate({ id });
  }
}
