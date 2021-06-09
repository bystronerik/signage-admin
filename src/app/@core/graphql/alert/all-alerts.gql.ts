import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Alert } from '@core/shared/alert';

export interface Response {
  findAllAlerts: Alert[];
}

@Injectable({
  providedIn: 'root',
})
export class AllAlertsGQL extends Query<Response> {
  document = gql`
    query ($data: FindAlertInput!) {
      findAllAlerts(data: $data) {
        id
        name
        type
        position
      }
    }
  `;
}
