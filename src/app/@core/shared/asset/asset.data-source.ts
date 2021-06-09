import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetService } from '@core/shared/asset/asset.service';
import { FindAssetInput } from '@core/graphql/asset';
import { Asset } from '@core/shared/asset/asset.model';

@Injectable({
  providedIn: 'root',
})
export class AssetDataSource extends LocalDataSource {
  lastRequestCount = 0;

  constructor(protected assetService: AssetService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindAssetInput();

    return new Promise<Asset[]>((resolve, reject) => {
      this.assetService
        .findAllAssets(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllAssets);
        });
    });
  }
}
