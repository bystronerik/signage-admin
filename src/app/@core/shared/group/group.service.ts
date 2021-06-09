import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import {
  AllGroupsGQL,
  CreateGroupGQL,
  CreateGroupInput,
  FindGroupInput,
  OneGroupGQL,
  UpdateGroupGQL,
  UpdateGroupInput,
} from '@core/graphql/group';
import { DeleteGroupGQL } from '@core/graphql/group/delete-group.gql';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private allGroupsGQL: AllGroupsGQL,
    private oneGroupGQL: OneGroupGQL,
    private createGroupGQL: CreateGroupGQL,
    private updateGroupGQL: UpdateGroupGQL,
    private deleteGroupGQL: DeleteGroupGQL
  ) {}

  findAllGroups(input: FindGroupInput): QueryRef<any, {}> {
    return this.allGroupsGQL.watch({ data: input });
  }

  findGroup(input: FindGroupInput): QueryRef<any, {}> {
    return this.oneGroupGQL.watch({ data: input });
  }

  updateGroup(id: string, input: UpdateGroupInput): Observable<FetchResult<any>> {
    return this.updateGroupGQL.mutate({ id, data: input });
  }

  createGroup(input: CreateGroupInput): Observable<FetchResult<any>> {
    return this.createGroupGQL.mutate({ data: input });
  }

  deleteGroup(id: string): Observable<FetchResult<any>> {
    return this.deleteGroupGQL.mutate({ id });
  }
}
