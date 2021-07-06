import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Directory } from '@core/shared/directory';

export interface Response {
  findAllDirectories: Directory[];
}

@Injectable({
  providedIn: 'root',
})
export class AllDirectoriesGQL extends Query<Response> {
  document = gql`
    query ($data: FindDirectoryInput!) {
      findAllDirectories(data: $data) {
        id
        name
        parentDirectory {
          id
        }
      }
    }
  `;
}
