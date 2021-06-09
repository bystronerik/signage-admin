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

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private allAlertsGQL: AllAlertsGQL,
    private oneAlertGQL: OneAlertGQL,
    private createAlertGQL: CreateAlertGQL,
    private updateAlertGQL: UpdateAlertGQL,
    private deleteAlertGQL: DeleteAlertGQL
  ) {}

  findAllAlerts(input: FindAlertInput): QueryRef<any, {}> {
    return this.allAlertsGQL.watch({ data: input });
  }

  findAlert(input: FindAlertInput): QueryRef<any, {}> {
    return this.oneAlertGQL.watch({ data: input });
  }

  updateAlert(id: string, input: UpdateAlertInput): Observable<FetchResult<any>> {
    return this.updateAlertGQL.mutate({ id, data: input });
  }

  createAlert(input: CreateAlertInput): Observable<FetchResult<any>> {
    return this.createAlertGQL.mutate({ data: input });
  }

  deleteAlert(id: string): Observable<FetchResult<any>> {
    return this.deleteAlertGQL.mutate({ id });
  }
}
