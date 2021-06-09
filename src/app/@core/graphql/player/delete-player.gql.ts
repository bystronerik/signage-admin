import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deletePlayer: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeletePlayerGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deletePlayer(id: $id)
    }
  `;
}
