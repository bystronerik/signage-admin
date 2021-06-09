import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { User } from '@core/shared/user';

export interface Response {
  updateUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateUserGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateUserInput!) {
      updateUser(id: $id, data: $data) {
        id
      }
    }
  `;
}
