import {FindInput} from '@core/graphql/findinput';
import {Observable} from 'rxjs';
import {QueryRef} from 'apollo-angular';
import {FetchResult} from '@apollo/client/core';

export interface IEntityService<E, F extends FindInput, U, C> {
  findAll(input: F): Observable<any>;
  find(input: F): QueryRef<any, any>;
  update(id: string, input: U, file: File): Observable<FetchResult<any>>;
  create(input: C, file: File): Observable<FetchResult<any>>;
  delete(id: string);
}
