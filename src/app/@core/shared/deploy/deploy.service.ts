import { Injectable } from '@angular/core';
import { DeployGQL } from '@core/graphql/deploy';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class DeployService {
  constructor(private deployGQL: DeployGQL) {}

  deploy(): Observable<FetchResult<any>> {
    return this.deployGQL.mutate();
  }
}
