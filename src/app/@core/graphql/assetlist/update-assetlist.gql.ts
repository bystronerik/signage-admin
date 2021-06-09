import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  updateAssetList: AssetList;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateAssetListGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateAssetListInput!) {
      updateAssetList(id: $id, data: $data) {
        id
      }
    }
  `;
}
