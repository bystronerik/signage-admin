import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { AssetList } from '@core/shared/assetlist';

export interface Response {
  findAssetList: AssetList;
}

@Injectable({
  providedIn: 'root',
})
export class OneAssetListGQL extends Query<Response> {
  document = gql`
    query ($data: FindAssetListInput!) {
      findAssetList(data: $data) {
        id
        name
        type
        prioritized
        enabled
        validity {
          enabled
          from
          to
        }
        assets {
          id
          asset {
            id
            name
            path
          }
          validity {
            enabled
            from
            to
          }
          showTime
          animationIn {
            id
            name
          }
        }
      }
    }
  `;
}
