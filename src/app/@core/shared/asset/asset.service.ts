import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  AllAssetsGQL,
  CreateAssetGQL,
  CreateAssetInput,
  FindAssetInput,
  OneAssetGQL,
  UpdateAssetGQL,
  UpdateAssetInput,
} from '@core/graphql/asset';
import { DeleteAssetGQL } from '@core/graphql/asset/delete-asset.gql';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(
    private allAssetsGQL: AllAssetsGQL,
    private oneAssetGQL: OneAssetGQL,
    private createAssetGQL: CreateAssetGQL,
    private updateAssetGQL: UpdateAssetGQL,
    private deleteAssetGQL: DeleteAssetGQL
  ) {}

  findAllAssets(input: FindAssetInput): QueryRef<any, {}> {
    return this.allAssetsGQL.watch({ data: input });
  }

  findAsset(input: FindAssetInput): QueryRef<any, {}> {
    return this.oneAssetGQL.watch({ data: input });
  }

  updateAsset(id: string, input: UpdateAssetInput, file: File): Observable<FetchResult<any>> {
    return this.updateAssetGQL.mutate({ id, data: input, file }, { context: { useMultipart: true } });
  }

  createAsset(input: CreateAssetInput, file: File): Observable<FetchResult<any>> {
    return this.createAssetGQL.mutate({ data: input, file }, { context: { useMultipart: true } });
  }

  deleteAsset(id: string): Observable<FetchResult<any>> {
    return this.deleteAssetGQL.mutate({ id });
  }
}
