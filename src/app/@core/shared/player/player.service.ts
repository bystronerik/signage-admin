import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  FindAllPlayersGQL,
  CreatePlayerGQL,
  CreatePlayerInput,
  FindPlayerInput,
  FindPlayerGQL,
  UpdatePlayerGQL,
  UpdatePlayerInput,
  DeletePlayerGQL,
  Player, FindPlayerQuery, FindPlayerQueryVariables, UpdatePlayerMutation, CreatePlayerMutation, DeletePlayerMutation
} from '@app/graphql';
import { map } from 'rxjs/operators';
import { IEntityService } from '@core/interfaces/entity-service.interface';
@Injectable({
  providedIn: 'root',
})
export class PlayerService implements IEntityService<Player, FindPlayerInput, UpdatePlayerInput, CreatePlayerInput> {
  constructor(
    private findAllPlayersGQL: FindAllPlayersGQL,
    private findPlayerGQL: FindPlayerGQL,
    private createPlayerGQL: CreatePlayerGQL,
    private updatePlayerGQL: UpdatePlayerGQL,
    private deletePlayerGQL: DeletePlayerGQL
  ) {}

  findAll(input: FindPlayerInput): Observable<Array<Player>> {
    return this.findAllPlayersGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllPlayers));
  }

  find(input: FindPlayerInput): QueryRef<FindPlayerQuery, FindPlayerQueryVariables> {
    return this.findPlayerGQL.watch({ data: input });
  }

  update(id: string, input: UpdatePlayerInput): Observable<FetchResult<UpdatePlayerMutation>> {
    return this.updatePlayerGQL.mutate({ id, data: input });
  }

  create(input: CreatePlayerInput): Observable<FetchResult<CreatePlayerMutation>> {
    return this.createPlayerGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeletePlayerMutation>> {
    return this.deletePlayerGQL.mutate({ id });
  }
}
