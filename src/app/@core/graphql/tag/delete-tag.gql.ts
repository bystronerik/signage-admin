import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Tag } from '@core/shared/tag';

export interface Response {
  deleteTag: Tag;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteTagGQL extends Mutation<Response> {
  document = gql`
    mutation ($id: ID!) {
      deleteTag(id: $id) {
        id
      }
    }
  `;
}
