import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { User } from '@core/shared/user';

export interface Response {
  createUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class CreateUserGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateUserInput!) {
      createUser(data: $data) {
        id
      }
    }
  `;
}
