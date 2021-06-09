import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Asset } from '@core/shared/asset';
import { AssetListService } from '@core/shared/assetlist/assetlist.service';
import { FindAssetListInput } from '@core/graphql/assetlist/find-assetlist-input.model';

class DataHolder {
  assetId: string;
  assetName: string;
  validityEnabled: boolean;
  validFrom: string;
  validTo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssetListAssetsDataSource extends LocalDataSource {
  assetListId: string;
  lastRequestCount = 0;

  constructor(protected assetListService: AssetListService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindAssetListInput();

    return new Promise<Asset[]>((resolve, reject) => {
      input.id = this.assetListId;

      this.assetListService
        .findAssetList(input)
        .result()
        .then((value) => {
          const data = value.data.findAssetList.assets ? value.data.findAssetList.assets : [];
          const assets = [];

          data.forEach((val) => {
            const item = new DataHolder();

            item.assetId = val.asset.id;
            item.assetName = val.asset.name;
            item.validityEnabled = val.validity.enabled;
            item.validFrom = val.validity.from;
            item.validTo = val.validity.to;

            assets.push(item);
          });

          resolve(assets);
        });
    });
  }
}
