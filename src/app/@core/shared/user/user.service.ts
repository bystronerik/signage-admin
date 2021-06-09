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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private allUsersGQL: AllUsersGQL,
    private oneUserGQL: OneUserGQL,
    private createUserGQL: CreateUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL
  ) {}

  findAllUsers(input: FindUserInput): QueryRef<any, {}> {
    return this.allUsersGQL.watch({ data: input });
  }

  findUser(input: FindUserInput): QueryRef<any, {}> {
    return this.oneUserGQL.watch({ data: input });
  }

  updateUser(id: string, input: UpdateUserInput): Observable<FetchResult<any>> {
    return this.updateUserGQL.mutate({ id, data: input });
  }

  createUser(input: CreateUserInput): Observable<FetchResult<any>> {
    return this.createUserGQL.mutate({ data: input });
  }

  deleteUser(id: string): Observable<FetchResult<any>> {
    return this.deleteUserGQL.mutate({ id });
  }
}
