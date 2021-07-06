import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Directory } from '@core/shared/directory';

export interface Response {
  updateDirectory: Directory;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateDirectoryGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateDirectoryInput!) {
      updateDirectory(id: $id, data: $data) {
        id
      }
    }
  `;
}
