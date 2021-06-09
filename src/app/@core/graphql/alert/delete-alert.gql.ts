import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deleteAlert: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAlertGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteAlert(id: $id)
    }
  `;
}
