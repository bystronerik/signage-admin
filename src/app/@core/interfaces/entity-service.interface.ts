import { Observable } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { FetchResult } from '@apollo/client/core';

export interface IEntityService<E, F, U, C> {
  findAll(input: F): Observable<Array<E|Partial<E>>>;
  find(input: F): QueryRef<any, any>;
  update(id: string, input: U, file: File): Observable<FetchResult<any>>;
  create(input: C, file: File): Observable<FetchResult<any>>;
  delete(id: string);
}
