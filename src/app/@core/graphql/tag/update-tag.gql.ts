import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Tag } from '@core/shared/tag';

export interface Response {
  updateTag: Tag;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateTagGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!, $data: UpdateTagInput!) {
      updateTag(id: $id, data: $data) {
        id
      }
    }
  `;
}
