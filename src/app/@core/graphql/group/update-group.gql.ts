import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Group } from '@core/shared/group';

export interface Response {
  updateGroup: Group;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateGroupGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateGroupInput!) {
      updateGroup(id: $id, data: $data) {
        id
      }
    }
  `;
}
