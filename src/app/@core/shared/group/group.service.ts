import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  FindAllGroupsGQL,
  CreateGroupGQL,
  CreateGroupInput,
  FindGroupInput,
  FindGroupGQL,
  UpdateGroupGQL,
  UpdateGroupInput,
  DeleteGroupGQL,
  Group, FindGroupQuery, FindGroupQueryVariables, UpdateGroupMutation, CreateGroupMutation, DeleteGroupMutation
} from '@app/graphql';
import { map } from 'rxjs/operators';
import { IEntityService } from '@core/interfaces/entity-service.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService implements IEntityService<Group, FindGroupInput, UpdateGroupInput, CreateGroupInput> {
  constructor(
    private findAllGroupsGQL: FindAllGroupsGQL,
    private findGroupGQL: FindGroupGQL,
    private createGroupGQL: CreateGroupGQL,
    private updateGroupGQL: UpdateGroupGQL,
    private deleteGroupGQL: DeleteGroupGQL
  ) {}

  findAll(input: FindGroupInput): Observable<Array<Group>> {
    return this.findAllGroupsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllGroups));
  }

  find(input: FindGroupInput): QueryRef<FindGroupQuery, FindGroupQueryVariables> {
    return this.findGroupGQL.watch({ data: input });
  }

  update(id: string, input: UpdateGroupInput): Observable<FetchResult<UpdateGroupMutation>> {
    return this.updateGroupGQL.mutate({ id, data: input });
  }

  create(input: CreateGroupInput): Observable<FetchResult<CreateGroupMutation>> {
    return this.createGroupGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteGroupMutation>> {
    return this.deleteGroupGQL.mutate({ id });
  }
}
