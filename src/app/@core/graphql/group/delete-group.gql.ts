import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Group } from '@core/shared/group';

export interface Response {
  deleteGroup: Group;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteGroupGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteGroup(id: $id) {
        id
      }
    }
  `;
}
