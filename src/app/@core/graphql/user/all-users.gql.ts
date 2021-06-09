import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { User } from '@core/shared/user';

export interface Response {
  findAllUsers: User[];
}

@Injectable({
  providedIn: 'root',
})
export class AllUsersGQL extends Query<Response> {
  document = gql`
    query ($data: FindUserInput!) {
      findAllUsers(data: $data) {
        id
        username
        role
      }
    }
  `;
}
