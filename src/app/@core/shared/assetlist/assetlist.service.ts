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
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { AssetList } from '@core/shared/assetlist/assetlist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssetListService
  implements IEntityService<AssetList, FindAssetListInput, UpdateAssetListInput, CreateAssetListInput>
{
  constructor(
    private allAssetListsGQL: AllAssetListsGQL,
    private oneAssetListGQL: OneAssetListGQL,
    private createAssetListGQL: CreateAssetListGQL,
    private updateAssetListGQL: UpdateAssetListGQL,
    private deleteAssetListGQL: DeleteAssetListGQL,
    private assetAssignGQL: AssetAssignGQL,
    private assetRemoveGQL: AssetRemoveGQL
  ) {}

  findAll(input: FindAssetListInput): Observable<any> {
    return this.allAssetListsGQL
      .watch({ data: input })
      .valueChanges.pipe(map((result) => result.data.findAllAssetLists));
  }

  find(input: FindAssetListInput): QueryRef<any> {
    return this.oneAssetListGQL.watch({ data: input });
  }

  update(id: string, input: UpdateAssetListInput): Observable<FetchResult<any>> {
    return this.updateAssetListGQL.mutate({ id, data: input });
  }

  create(input: CreateAssetListInput): Observable<FetchResult<any>> {
    return this.createAssetListGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteAssetListGQL.mutate({ id });
  }

  assignAssetToAssetList(id: string, data: AssetAssignInput): Observable<FetchResult<any>> {
    return this.assetAssignGQL.mutate({ id, data });
  }

  removeAssetFromAssetList(id: string, assetId: string): Observable<FetchResult<any>> {
    return this.assetRemoveGQL.mutate({ id, asset: assetId });
  }
}
