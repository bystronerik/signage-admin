import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Tag } from '@core/shared/tag';

export interface Response {
  createTag: Tag;
}

@Injectable({
  providedIn: 'root',
})
export class CreateTagGQL extends Mutation<Response> {
  document = gql`
    mutation ($data: CreateTagInput!) {
      createTag(data: $data) {
        id
      }
    }
  `;
}
