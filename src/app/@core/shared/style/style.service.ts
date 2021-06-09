import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import {
  AllStylesGQL,
  CreateStyleGQL,
  CreateStyleInput,
  DeleteStyleGQL,
  FindStyleInput,
  OneStyleGQL,
  UpdateStyleGQL,
  UpdateStyleInput,
} from '@core/graphql/style';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  constructor(
    private allStylesGQL: AllStylesGQL,
    private oneStyleGQL: OneStyleGQL,
    private createStyleGQL: CreateStyleGQL,
    private updateStyleGQL: UpdateStyleGQL,
    private deleteStyleGQL: DeleteStyleGQL
  ) {}

  findAllStyles(input: FindStyleInput): QueryRef<any, {}> {
    return this.allStylesGQL.watch({ data: input });
  }

  findStyle(input: FindStyleInput): QueryRef<any, {}> {
    return this.oneStyleGQL.watch({ data: input });
  }

  updateStyle(id: string, input: UpdateStyleInput): Observable<FetchResult<any>> {
    return this.updateStyleGQL.mutate({ id, data: input });
  }

  createStyle(input: CreateStyleInput): Observable<FetchResult<any>> {
    return this.createStyleGQL.mutate({ data: input });
  }

  deleteStyle(id: string): Observable<FetchResult<any>> {
    return this.deleteStyleGQL.mutate({ id });
  }
}
