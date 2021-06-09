import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Player } from '@core/shared/player';

export interface Response {
  findPlayer: Player;
}

@Injectable({
  providedIn: 'root',
})
export class OnePlayerGQL extends Query<Response> {
  document = gql`
    query ($data: FindPlayerInput!) {
      findPlayer(data: $data) {
        id
        name
        token
        group {
          id
          name
        }
      }
    }
  `;
}
