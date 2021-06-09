import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Group } from '@core/shared/group';

export interface Response {
  findGroup: Group;
}

@Injectable({
  providedIn: 'root',
})
export class OneGroupGQL extends Query<Response> {
  document = gql`
    query ($data: FindGroupInput!) {
      findGroup(data: $data) {
        id
        name
        assetLists {
          id
          name
        }
        alert {
          id
          name
        }
      }
    }
  `;
}
