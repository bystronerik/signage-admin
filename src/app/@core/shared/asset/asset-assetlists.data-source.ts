import { LocalDataSource } from 'ng2-smart-table';
import { AssetService } from '@core/shared/asset/asset.service';
import { FindAssetInput } from '@core/graphql/asset';
import { Asset } from '@core/shared/asset/asset.model';

export class AssetAssetListsDataSource extends LocalDataSource {
  assetId: string;
  lastRequestCount = 0;

  constructor(protected assetService: AssetService, private type: string) {
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
