import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { SignInResult } from '@app/+auth/shared/interfaces';

export interface Response {
  login: SignInResult;
}

@Injectable({
  providedIn: 'root',
})
export class LoginGQL extends Mutation<Response> {
  document = gql`
    mutation login($username: String!, $password: String!, $shortSession: Boolean!) {
      login(username: $username, password: $password, shortSession: $shortSession) {
        user {
          id
          username
          role
        }
        token {
          accessToken
          expiresIn
        }
      }
    }
  `;
}
