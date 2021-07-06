import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Style } from '@core/shared/style';

export interface Response {
  deleteStyle: Style;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteStyleGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteStyle(id: $id) {
        id
      }
    }
  `;
}
