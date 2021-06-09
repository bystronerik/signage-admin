import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetList } from '@core/shared/assetlist/assetlist.model';
import { AssetListService } from '@core/shared/assetlist/assetlist.service';
import { FindAssetListInput } from '@core/graphql/assetlist/find-assetlist-input.model';

@Injectable({
  providedIn: 'root',
})
export class AssetListDataSource extends LocalDataSource {
  assetListsType = '';
  lastRequestCount = 0;

  constructor(protected assetListService: AssetListService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindAssetListInput();
    input.type = this.assetListsType;

    return new Promise<AssetList[]>((resolve, reject) => {
      this.assetListService
        .findAllAssetLists(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllAssetLists);
        });
    });
  }
}
