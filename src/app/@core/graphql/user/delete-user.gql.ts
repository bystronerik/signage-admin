import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { User } from '@core/shared/user';

export interface Response {
  deleteUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  `;
}
