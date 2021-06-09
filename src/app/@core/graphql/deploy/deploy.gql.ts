import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { DeployData } from '@core/shared/deploy/deploy.model';

export interface Response {
  deploy: DeployData;
}

@Injectable({
  providedIn: 'root',
})
export class DeployGQL extends Mutation<Response> {
  document = gql`
    mutation {
      deploy {
        versionHash
      }
    }
  `;
}
