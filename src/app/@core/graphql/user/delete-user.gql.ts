import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deleteUser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteUser(id: $id)
    }
  `;
}
