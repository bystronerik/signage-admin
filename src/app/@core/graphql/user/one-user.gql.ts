import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { User } from '@core/shared/user';

export interface Response {
  findUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class OneUserGQL extends Query<Response> {
  document = gql`
    query ($data: FindUserInput!) {
      findUser(data: $data) {
        id
        username
        role
      }
    }
  `;
}
