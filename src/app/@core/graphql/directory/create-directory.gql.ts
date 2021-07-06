import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Directory } from '@core/shared/directory';

export interface Response {
  createDirectory: Directory;
}

@Injectable({
  providedIn: 'root',
})
export class CreateDirectoryGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateDirectoryInput!) {
      createDirectory(data: $data) {
        id
        name
      }
    }
  `;
}
