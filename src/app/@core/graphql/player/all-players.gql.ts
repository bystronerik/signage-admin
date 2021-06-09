import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Player } from '@core/shared/player';

export interface Response {
  findAllPlayers: Player[];
}

@Injectable({
  providedIn: 'root',
})
export class AllPlayersGQL extends Query<Response> {
  document = gql`
    query ($data: FindPlayerInput!) {
      findAllPlayers(data: $data) {
        id
        name
        token
      }
    }
  `;
}
