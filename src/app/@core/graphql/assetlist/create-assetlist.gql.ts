import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  createAssetList: AssetList;
}

@Injectable({
  providedIn: 'root',
})
export class CreateAssetListGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateAssetListInput!) {
      createAssetList(data: $data) {
        id
      }
    }
  `;
}
