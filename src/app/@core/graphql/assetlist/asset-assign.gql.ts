import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  assignAssetToAssetList: AssetList;
}

@Injectable({
  providedIn: 'root',
})
export class AssetAssignGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: AssetAssignInput!) {
      assignAssetToAssetList(id: $id, data: $data) {
        id
      }
    }
  `;
}
