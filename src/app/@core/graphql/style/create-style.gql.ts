import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Style } from '@core/shared/style';

export interface Response {
  createStyle: Style;
}

@Injectable({
  providedIn: 'root',
})
export class CreateStyleGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateStyleInput!) {
      createStyle(data: $data) {
        id
      }
    }
  `;
}
