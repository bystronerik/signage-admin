import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deleteStyle: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteStyleGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteStyle(id: $id)
    }
  `;
}
