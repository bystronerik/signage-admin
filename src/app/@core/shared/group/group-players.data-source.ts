import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PlayerService } from '@core/shared/player';
import { FindGroupInput } from '@core/graphql/group';
import { ActivatedRoute } from '@angular/router';
import { Player } from '@core/shared/player';
import { FindPlayerInput } from '@core/graphql/player';

@Injectable({
  providedIn: 'root',
})
export class GroupPlayersDataSource extends LocalDataSource {
  groupId: string;
  lastRequestCount = 0;

  constructor(protected playerService: PlayerService, private route: ActivatedRoute) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindPlayerInput();

    return new Promise<Player[]>((resolve, reject) => {
      input.id = this.groupId;

      this.playerService
        .findAllPlayers(input)
        .result()
        .then(
          (value) => {
            resolve(value.data.findGroup.player ? value.data.findGroup.player : []);
          },
          (error) => {}
        );
    });
  }
}
