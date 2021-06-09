import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  removeAssetFromAssetList: AssetList;
}

@Injectable({
  providedIn: 'root',
})
export class AssetRemoveGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $asset: ID!) {
      removeAssetFromAssetList(id: $id, asset: $asset) {
        id
      }
    }
  `;
}
