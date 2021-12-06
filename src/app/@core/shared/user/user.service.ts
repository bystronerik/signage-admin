import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  FindAllUsersGQL,
  CreateUserGQL,
  CreateUserInput,
  FindUserInput,
  FindUserGQL,
  UpdateUserGQL,
  DeleteUserGQL,
  UpdateUserInput, CreateUserMutation, DeleteUserMutation, UpdateUserMutation, FindUserQuery, FindUserQueryVariables
} from '@app/graphql';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { User } from '@app/graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IEntityService<User, FindUserInput, CreateUserInput, UpdateUserInput> {
  constructor(
    private findAllUsersGQL: FindAllUsersGQL,
    private findUserGQL: FindUserGQL,
    private createUserGQL: CreateUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL
  ) {}

  findAll(input: FindUserInput): Observable<Array<User>> {
    return this.findAllUsersGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllUsers));
  }

  find(input: FindUserInput): QueryRef<FindUserQuery, FindUserQueryVariables> {
    return this.findUserGQL.watch({ data: input });
  }

  update(id: string, input: UpdateUserInput): Observable<FetchResult<UpdateUserMutation>> {
    return this.updateUserGQL.mutate({ id, data: input });
  }

  create(input: CreateUserInput): Observable<FetchResult<CreateUserMutation>> {
    return this.createUserGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteUserMutation>> {
    return this.deleteUserGQL.mutate({ id });
  }
}
