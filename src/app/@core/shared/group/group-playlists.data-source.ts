import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { GroupService } from '@core/shared/group/group.service';
import { FindGroupInput } from '@core/graphql/group';
import { ActivatedRoute } from '@angular/router';
import { AssetList } from '@core/shared/assetlist';

@Injectable({
  providedIn: 'root',
})
export class GroupPlaylistsDataSource extends LocalDataSource {
  groupId: string;
  lastRequestCount = 0;

  constructor(protected groupService: GroupService, private route: ActivatedRoute) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindGroupInput();

    return new Promise<AssetList[]>((resolve, reject) => {
      input.id = this.groupId;

      this.groupService
        .findGroup(input)
        .result()
        .then(
          (value) => {
            resolve(value.data.findGroup.assetLists ? value.data.findGroup.assetLists : []);
          },
          (error) => {}
        );
    });
  }
}
