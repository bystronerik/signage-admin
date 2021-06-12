import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  AllAlertsGQL,
  CreateAlertGQL,
  CreateAlertInput,
  FindAlertInput,
  OneAlertGQL,
  UpdateAlertGQL,
  UpdateAlertInput,
} from '@core/graphql/alert';
import { DeleteAlertGQL } from '@core/graphql/alert/delete-alert.gql';
import {map} from 'rxjs/operators';
import {IEntityService} from '@core/interfaces/entity-service.interface';
import {Alert} from '@core/shared/alert/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService implements IEntityService<Alert, FindAlertInput, UpdateAlertInput, CreateAlertInput> {
  constructor(
    private allAlertsGQL: AllAlertsGQL,
    private oneAlertGQL: OneAlertGQL,
    private createAlertGQL: CreateAlertGQL,
    private updateAlertGQL: UpdateAlertGQL,
    private deleteAlertGQL: DeleteAlertGQL
  ) {}

  findAll(input: FindAlertInput): Observable<any> {
    return this.allAlertsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllAlerts));
  }

  find(input: FindAlertInput): QueryRef<any, any> {
    return this.oneAlertGQL.watch({ data: input });
  }

  update(id: string, input: UpdateAlertInput): Observable<FetchResult<any>> {
    return this.updateAlertGQL.mutate({ id, data: input });
  }

  create(input: CreateAlertInput): Observable<FetchResult<any>> {
    return this.createAlertGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteAlertGQL.mutate({ id });
  }
}
