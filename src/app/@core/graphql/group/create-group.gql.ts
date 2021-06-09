import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Group } from '@core/shared/group';

export interface Response {
  createGroup: Group;
}

@Injectable({
  providedIn: 'root',
})
export class CreateGroupGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateGroupInput!) {
      createGroup(data: $data) {
        id
      }
    }
  `;
}
