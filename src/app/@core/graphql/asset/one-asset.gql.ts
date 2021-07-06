import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Asset } from '@core/shared/asset';

export interface Response {
  findAsset: Asset;
}

@Injectable({
  providedIn: 'root',
})
export class OneAssetGQL extends Query<Response> {
  document = gql`
    query ($data: FindAssetInput!) {
      findAsset(data: $data) {
        id
        name
        path
        type
        showTime
        directory {
          id
          name
        }
        tags {
          id
          name
          color
        }
        alert {
          id
          name
        }
        animationIn {
          id
          name
        }
        animationOut {
          id
          name
        }
        validity {
          enabled
          from
          to
        }
        assetLists {
          id
          name
          type
          assets {
            id
            asset {
              id
            }
          }
        }
      }
    }
  `;
}
