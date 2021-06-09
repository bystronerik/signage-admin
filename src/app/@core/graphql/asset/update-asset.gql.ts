import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Asset } from '@core/shared/asset';

export interface Response {
  updateAsset: Asset;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateAssetGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateAssetInput!, $file: FileUpload) {
      updateAsset(id: $id, data: $data, file: $file) {
        id
      }
    }
  `;
}
