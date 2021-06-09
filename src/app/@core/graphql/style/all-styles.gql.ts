import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Style } from '@core/shared/style';

export interface Response {
  findAllStyles: Style[];
}

@Injectable({
  providedIn: 'root',
})
export class AllStylesGQL extends Query<Response> {
  document = gql`
    query ($data: FindStyleInput!) {
      findAllStyles(data: $data) {
        id
        name
        type
        value
        valueType
      }
    }
  `;
}
