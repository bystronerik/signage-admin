import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Player } from '@core/shared/player';

export interface Response {
  createPlayer: Player;
}

@Injectable({
  providedIn: 'root',
})
export class CreatePlayerGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreatePlayerInput!) {
      createPlayer(data: $data) {
        id
      }
    }
  `;
}
