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
import { map } from 'rxjs/operators';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { Asset } from '@core/shared/asset/asset.model';

@Injectable({
  providedIn: 'root',
})
export class AssetService implements IEntityService<Asset, FindAssetInput, UpdateAssetInput, CreateAssetInput> {
  constructor(
    private allAssetsGQL: AllAssetsGQL,
    private oneAssetGQL: OneAssetGQL,
    private createAssetGQL: CreateAssetGQL,
    private updateAssetGQL: UpdateAssetGQL,
    private deleteAssetGQL: DeleteAssetGQL
  ) {}

  findAll(input: FindAssetInput): Observable<any> {
    return this.allAssetsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllAssets));
  }

  find(input: FindAssetInput): QueryRef<any, any> {
    return this.oneAssetGQL.watch({ data: input });
  }

  update(id: string, input: UpdateAssetInput, file: File): Observable<FetchResult<any>> {
    return this.updateAssetGQL.mutate({ id, data: input, file }, { context: { useMultipart: true } });
  }

  create(input: CreateAssetInput, file: File): Observable<FetchResult<any>> {
    return this.createAssetGQL.mutate({ data: input, file }, { context: { useMultipart: true } });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteAssetGQL.mutate({ id });
  }
}
