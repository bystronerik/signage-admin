import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Alert } from '@core/shared/alert';

export interface Response {
  deleteAlert: Alert;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAlertGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteAlert(id: $id) {
        id
      }
    }
  `;
}
