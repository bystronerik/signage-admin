import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Style } from '@core/shared/style';

export interface Response {
  findAnimation: Style;
}

@Injectable({
  providedIn: 'root',
})
export class OneStyleGQL extends Query<Response> {
  document = gql`
    query ($data: FindStyleInput!) {
      findStyle(data: $data) {
        id
        name
        type
        value
        valueType
      }
    }
  `;
}
