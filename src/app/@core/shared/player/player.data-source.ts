import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PlayerService } from '@core/shared/player/player.service';
import { FindPlayerInput } from '@core/graphql/player';
import { Player } from '@core/shared/player/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataSource extends LocalDataSource {
  lastRequestCount = 0;

  constructor(protected playerService: PlayerService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindPlayerInput();

    return new Promise<Player[]>((resolve, reject) => {
      this.playerService
        .findAllPlayers(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllPlayers);
        });
    });
  }
}
