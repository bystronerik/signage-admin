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
import {map} from 'rxjs/operators';
import {IEntityService} from '@core/interfaces/entity-service.interface';
import {Player} from '@core/shared/player/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements IEntityService<Player, FindPlayerInput, UpdatePlayerInput, CreatePlayerInput>{
  constructor(
    private allPlayersGQL: AllPlayersGQL,
    private onePlayerGQL: OnePlayerGQL,
    private createPlayerGQL: CreatePlayerGQL,
    private updatePlayerGQL: UpdatePlayerGQL,
    private deletePlayerGQL: DeletePlayerGQL
  ) {}

  findAll(input: FindPlayerInput): Observable<any> {
    return this.allPlayersGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllPlayers));
  }

  find(input: FindPlayerInput): QueryRef<any, any> {
    return this.onePlayerGQL.watch({ data: input });
  }

  update(id: string, input: UpdatePlayerInput): Observable<FetchResult<any>> {
    return this.updatePlayerGQL.mutate({ id, data: input });
  }

  create(input: CreatePlayerInput): Observable<FetchResult<any>> {
    return this.createPlayerGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deletePlayerGQL.mutate({ id });
  }
}
