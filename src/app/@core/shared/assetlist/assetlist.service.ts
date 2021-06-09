import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  AllAssetListsGQL,
  AssetAssignGQL,
  AssetAssignInput,
  AssetRemoveGQL,
  CreateAssetListGQL,
  CreateAssetListInput,
  DeleteAssetListGQL,
  FindAssetListInput,
  OneAssetListGQL,
  UpdateAssetListGQL,
  UpdateAssetListInput,
} from '@core/graphql/assetlist';

@Injectable({
  providedIn: 'root',
})
export class AssetListService {
  constructor(
    private allAssetListsGQL: AllAssetListsGQL,
    private oneAssetListGQL: OneAssetListGQL,
    private createAssetListGQL: CreateAssetListGQL,
    private updateAssetListGQL: UpdateAssetListGQL,
    private deleteAssetListGQL: DeleteAssetListGQL,
    private assetAssignGQL: AssetAssignGQL,
    private assetRemoveGQL: AssetRemoveGQL
  ) {}

  findAllAssetLists(input: FindAssetListInput): QueryRef<any, {}> {
    return this.allAssetListsGQL.watch({ data: input });
  }

  findAssetList(input: FindAssetListInput): QueryRef<any, {}> {
    return this.oneAssetListGQL.watch({ data: input });
  }

  updateAssetList(id: string, input: UpdateAssetListInput): Observable<FetchResult<any>> {
    return this.updateAssetListGQL.mutate({ id, data: input });
  }

  createAssetList(input: CreateAssetListInput): Observable<FetchResult<any>> {
    return this.createAssetListGQL.mutate({ data: input });
  }

  deleteAssetList(id: string): Observable<FetchResult<any>> {
    return this.deleteAssetListGQL.mutate({ id });
  }

  assignAssetToAssetList(id: string, data: AssetAssignInput): Observable<FetchResult<any>> {
    return this.assetAssignGQL.mutate({ id, data });
  }

  removeAssetFromAssetList(id: string, assetId: string): Observable<FetchResult<any>> {
    return this.assetRemoveGQL.mutate({ id, asset: assetId });
  }
}
