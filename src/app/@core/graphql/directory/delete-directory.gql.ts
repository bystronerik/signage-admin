import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Directory } from '@core/shared/directory';

export interface Response {
  deleteDirectory: Directory;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteDirectoryGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteDirectory(id: $id) {
        id
      }
    }
  `;
}
