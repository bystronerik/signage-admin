import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Asset } from '@core/shared/asset';

export interface Response {
  deleteAsset: Asset;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAssetGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteAsset(id: $id) {
        id
      }
    }
  `;
}
