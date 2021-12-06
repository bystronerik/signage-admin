import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  FindAllAssetsGQL,
  CreateAssetGQL,
  CreateAssetInput,
  FindAssetInput,
  FindAssetGQL,
  UpdateAssetGQL,
  UpdateAssetInput,
  DeleteAssetGQL,
  Asset, FindAssetQuery, FindAssetQueryVariables, UpdateAssetMutation, CreateAssetMutation, DeleteAssetMutation
} from '@app/graphql';
import { map } from 'rxjs/operators';
import { IEntityService } from '@core/interfaces/entity-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AssetService implements IEntityService<Asset, FindAssetInput, UpdateAssetInput, CreateAssetInput> {
  constructor(
    private findAllAssetsGQL: FindAllAssetsGQL,
    private findAssetGQL: FindAssetGQL,
    private createAssetGQL: CreateAssetGQL,
    private updateAssetGQL: UpdateAssetGQL,
    private deleteAssetGQL: DeleteAssetGQL
  ) {}

  findAll(input: FindAssetInput): Observable<Array<Asset>> {
    return this.findAllAssetsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllAssets));
  }

  find(input: FindAssetInput): QueryRef<FindAssetQuery, FindAssetQueryVariables> {
    return this.findAssetGQL.watch({ data: input });
  }

  update(id: string, input: UpdateAssetInput, file: File): Observable<FetchResult<UpdateAssetMutation>> {
    return this.updateAssetGQL.mutate({ id, data: input, file }, { context: { useMultipart: true } });
  }

  create(input: CreateAssetInput, file: File): Observable<FetchResult<CreateAssetMutation>> {
    return this.createAssetGQL.mutate({ data: input, file }, { context: { useMultipart: true } });
  }

  delete(id: string): Observable<FetchResult<DeleteAssetMutation>> {
    return this.deleteAssetGQL.mutate({ id });
  }
}
