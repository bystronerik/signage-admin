import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  AllPlayersGQL,
  CreatePlayerGQL,
  CreatePlayerInput,
  FindPlayerInput,
  OnePlayerGQL,
  UpdatePlayerGQL,
  UpdatePlayerInput,
} from '@core/graphql/player';
import { DeletePlayerGQL } from '@core/graphql/player/delete-player.gql';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private allPlayersGQL: AllPlayersGQL,
    private onePlayerGQL: OnePlayerGQL,
    private createPlayerGQL: CreatePlayerGQL,
    private updatePlayerGQL: UpdatePlayerGQL,
    private deletePlayerGQL: DeletePlayerGQL
  ) {}

  findAllPlayers(input: FindPlayerInput): QueryRef<any, {}> {
    return this.allPlayersGQL.watch({ data: input });
  }

  findPlayer(input: FindPlayerInput): QueryRef<any, {}> {
    return this.onePlayerGQL.watch({ data: input });
  }

  updatePlayer(id: string, input: UpdatePlayerInput): Observable<FetchResult<any>> {
    return this.updatePlayerGQL.mutate({ id, data: input });
  }

  createPlayer(input: CreatePlayerInput): Observable<FetchResult<any>> {
    return this.createPlayerGQL.mutate({ data: input });
  }

  deletePlayer(id: string): Observable<FetchResult<any>> {
    return this.deletePlayerGQL.mutate({ id });
  }
}
