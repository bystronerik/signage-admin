import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deleteAsset: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAssetGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteAsset(id: $id)
    }
  `;
}
