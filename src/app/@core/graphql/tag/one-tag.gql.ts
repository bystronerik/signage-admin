import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Tag } from '@core/shared/tag';

export interface Response {
  findTag: Tag;
}

@Injectable({
  providedIn: 'root',
})
export class OneTagGQL extends Query<Response> {
  document = gql`
    query ($data: FindTagInput!) {
      findTag(data: $data) {
        id
        name
        color
      }
    }
  `;
}
