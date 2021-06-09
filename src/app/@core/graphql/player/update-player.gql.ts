import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Player } from '@core/shared/player';

export interface Response {
  updatePlayer: Player;
}

@Injectable({
  providedIn: 'root',
})
export class UpdatePlayerGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdatePlayerInput!) {
      updatePlayer(id: $id, data: $data) {
        id
      }
    }
  `;
}
