import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  AllUsersGQL,
  CreateUserGQL,
  CreateUserInput,
  FindUserInput,
  OneUserGQL,
  UpdateUserGQL,
  UpdateUserInput,
} from '@core/graphql/user';
import { DeleteUserGQL } from '@core/graphql/user/delete-user.gql';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { User } from '@core/shared/user/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IEntityService<User, FindUserInput, CreateUserInput, UpdateUserInput> {
  constructor(
    private allUsersGQL: AllUsersGQL,
    private oneUserGQL: OneUserGQL,
    private createUserGQL: CreateUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL
  ) {}

  findAll(input: FindUserInput): Observable<any> {
    return this.allUsersGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllUsers));
  }

  find(input: FindUserInput): QueryRef<any, {}> {
    return this.oneUserGQL.watch({ data: input });
  }

  update(id: string, input: UpdateUserInput): Observable<FetchResult<any>> {
    return this.updateUserGQL.mutate({ id, data: input });
  }

  create(input: CreateUserInput): Observable<FetchResult<any>> {
    return this.createUserGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteUserGQL.mutate({ id });
  }
}
