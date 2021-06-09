import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Alert } from '@core/shared/alert';

export interface Response {
  updateAlert: Alert;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateAlertGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateAlertInput!) {
      updateAlert(id: $id, data: $data) {
        id
      }
    }
  `;
}
