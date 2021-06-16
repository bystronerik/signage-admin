import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Alert } from '@core/shared/alert';

export interface Response {
  findAlert: Alert;
}

@Injectable({
  providedIn: 'root',
})
export class OneAlertGQL extends Query<Response> {
  document = gql`
    query ($data: FindAlertInput!) {
      findAlert(data: $data) {
        id
        name
        type
        position
        value
        running
        validity {
          enabled
          from
          to
        }
        background {
          id
          name
          type
          value
          valueType
        }
        borders {
          id
          name
          type
          value
          valueType
        }
        height {
          id
          name
          type
          value
          valueType
        }
        textSize {
          id
          name
          type
          value
          valueType
        }
        textColor {
          id
          name
          type
          value
          valueType
        }
        textPosition {
          id
          name
          type
          value
          valueType
        }
      }
    }
  `;
}
