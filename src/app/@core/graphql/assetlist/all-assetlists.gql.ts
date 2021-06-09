import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  findAllAssetLists: AssetList[];
}

@Injectable({
  providedIn: 'root',
})
export class AllAssetListsGQL extends Query<Response> {
  document = gql`
    query ($data: FindAssetListInput!) {
      findAllAssetLists(data: $data) {
        id
        name
      }
    }
  `;
}
