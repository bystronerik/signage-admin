import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Asset } from '@core/shared/asset';

export interface Response {
  findAllAssets: Asset[];
}

@Injectable({
  providedIn: 'root',
})
export class AllAssetsGQL extends Query<Response> {
  document = gql`
    query ($data: FindAssetInput!) {
      findAllAssets(data: $data) {
        id
        name
        type
        path
        showTime
      }
    }
  `;
}
