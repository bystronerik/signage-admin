import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Asset } from '@core/shared/asset';

export interface Response {
  createAsset: Asset;
}

@Injectable({
  providedIn: 'root',
})
export class CreateAssetGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateAssetInput!, $file: FileUpload!) {
      createAsset(data: $data, file: $file) {
        id
      }
    }
  `;
}
