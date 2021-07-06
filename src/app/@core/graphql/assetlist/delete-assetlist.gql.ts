import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  deleteAssetList: AssetList;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAssetListGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteAssetList(id: $id) {
        id
      }
    }
  `;
}
