import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

export interface Response {
  deleteAssetList: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAssetListGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteAssetList(id: $id)
    }
  `;
}
