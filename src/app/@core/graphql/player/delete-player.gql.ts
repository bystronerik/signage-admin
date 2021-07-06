import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Player } from '@core/shared/player';

export interface Response {
  deletePlayer: Player;
}

@Injectable({
  providedIn: 'root',
})
export class DeletePlayerGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deletePlayer(id: $id) {
        id
      }
    }
  `;
}
