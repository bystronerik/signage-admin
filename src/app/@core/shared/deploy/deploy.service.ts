import { Injectable } from '@angular/core';
import { DeployGQL, DeployMutation } from '@app/graphql';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class DeployService {
  constructor(private deployGQL: DeployGQL) {}

  deploy(): Observable<FetchResult<DeployMutation>> {
    return this.deployGQL.mutate();
  }
}
