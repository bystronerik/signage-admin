import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  FindAllAssetListsGQL,
  AssignAssetToAssetListGQL,
  AssetAssignInput,
  RemoveAssetFromAssetListGQL,
  CreateAssetListGQL,
  CreateAssetListInput,
  DeleteAssetListGQL,
  FindAssetListInput,
  FindAssetListGQL,
  UpdateAssetListGQL,
  UpdateAssetListInput,
  AssetList,
  FindAssetListQuery,
  FindAssetListQueryVariables,
  UpdateAssetListMutation,
  CreateAssetListMutation,
  DeleteAssetListMutation
} from '@app/graphql';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssetListService
  implements IEntityService<AssetList, FindAssetListInput, UpdateAssetListInput, CreateAssetListInput>
{
  constructor(
    private findAllAssetListsGQL: FindAllAssetListsGQL,
    private findAssetListGQL: FindAssetListGQL,
    private createAssetListGQL: CreateAssetListGQL,
    private updateAssetListGQL: UpdateAssetListGQL,
    private deleteAssetListGQL: DeleteAssetListGQL,
    private assetAssignGQL: AssignAssetToAssetListGQL,
    private assetRemoveGQL: RemoveAssetFromAssetListGQL,
  ) {}

  findAll(input: FindAssetListInput): Observable<Array<Partial<AssetList>>> {
    return this.findAllAssetListsGQL
      .watch({ data: input })
      .valueChanges.pipe(map((result) => result.data.findAllAssetLists));
  }

  find(input: FindAssetListInput): QueryRef<FindAssetListQuery, FindAssetListQueryVariables> {
    return this.findAssetListGQL.watch({ data: input });
  }

  update(id: string, input: UpdateAssetListInput): Observable<FetchResult<UpdateAssetListMutation>> {
    return this.updateAssetListGQL.mutate({ id, data: input });
  }

  create(input: CreateAssetListInput): Observable<FetchResult<CreateAssetListMutation>> {
    return this.createAssetListGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteAssetListMutation>> {
    return this.deleteAssetListGQL.mutate({ id });
  }

  assignAssetToAssetList(id: string, data: AssetAssignInput): Observable<FetchResult<any>> {
    return this.assetAssignGQL.mutate({ id, data });
  }

  removeAssetFromAssetList(id: string, assetId: string): Observable<FetchResult<any>> {
    return this.assetRemoveGQL.mutate({ id, asset: assetId });
  }
}
