import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Directory } from '@core/shared/directory';

export interface Response {
  findDirectory: Directory;
}

@Injectable({
  providedIn: 'root',
})
export class OneDirectoryGQL extends Query<Response> {
  document = gql`
    query ($data: FindDirectoryInput!) {
      findDirectory(data: $data) {
        id
        name
      }
    }
  `;
}
