import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Tag } from '@core/shared/tag';

export interface Response {
  findAllTags: Tag[];
}

@Injectable({
  providedIn: 'root',
})
export class AllTagsGQL extends Query<Response> {
  document = gql`
    query ($data: FindTagInput!) {
      findAllTags(data: $data) {
        id
        name
        color
      }
    }
  `;
}
