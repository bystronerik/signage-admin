import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Group } from '@core/shared/group';

export interface Response {
  findAllGroups: Group[];
}

@Injectable({
  providedIn: 'root',
})
export class AllGroupsGQL extends Query<Response> {
  document = gql`
    query ($data: FindGroupInput!) {
      findAllGroups(data: $data) {
        id
        name
      }
    }
  `;
}
