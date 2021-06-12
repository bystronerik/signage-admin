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
import {map} from 'rxjs/operators';
import {IEntityService} from '@core/interfaces/entity-service.interface';
import {Group} from '@core/shared/group/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService implements IEntityService<Group, FindGroupInput, UpdateGroupInput, CreateGroupInput>{
  constructor(
    private allGroupsGQL: AllGroupsGQL,
    private oneGroupGQL: OneGroupGQL,
    private createGroupGQL: CreateGroupGQL,
    private updateGroupGQL: UpdateGroupGQL,
    private deleteGroupGQL: DeleteGroupGQL
  ) {}

  findAll(input: FindGroupInput): Observable<any> {
    return this.allGroupsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllGroups));
  }

  find(input: FindGroupInput): QueryRef<any, any> {
    return this.oneGroupGQL.watch({ data: input });
  }

  update(id: string, input: UpdateGroupInput): Observable<FetchResult<any>> {
    return this.updateGroupGQL.mutate({ id, data: input });
  }

  create(input: CreateGroupInput): Observable<FetchResult<any>> {
    return this.createGroupGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteGroupGQL.mutate({ id });
  }
}
