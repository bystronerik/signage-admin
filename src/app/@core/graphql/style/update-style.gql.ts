import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Style } from '@core/shared/style';

export interface Response {
  updateStyle: Style;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateStyleGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateStyleInput!) {
      updateStyle(id: $id, data: $data) {
        id
      }
    }
  `;
}
