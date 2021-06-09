import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Alert } from '@core/shared/alert';

export interface Response {
  createAlert: Alert;
}

@Injectable({
  providedIn: 'root',
})
export class CreateAlertGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateAlertInput!) {
      createAlert(data: $data) {
        id
      }
    }
  `;
}
