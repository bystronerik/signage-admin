import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deleteGroup: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteGroupGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteGroup(id: $id)
    }
  `;
}
