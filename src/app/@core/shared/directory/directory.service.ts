import { Injectable } from '@angular/core';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import {
  FindAllDirectoriesGQL,
  CreateDirectoryGQL,
  CreateDirectoryInput,
  DeleteDirectoryGQL,
  FindDirectoryInput,
  FindDirectoryGQL,
  UpdateDirectoryGQL,
  UpdateDirectoryInput,
  Directory,
  FindDirectoryQuery,
  FindDirectoryQueryVariables,
  UpdateDirectoryMutation,
  CreateDirectoryMutation,
  DeleteDirectoryMutation
} from '@app/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService
  implements IEntityService<Directory, FindDirectoryInput, UpdateDirectoryInput, CreateDirectoryInput>
{
  constructor(
    private findAllDirectoriesGQL: FindAllDirectoriesGQL,
    private findDirectoryGQL: FindDirectoryGQL,
    private createDirectoryGQL: CreateDirectoryGQL,
    private updateDirectoryGQL: UpdateDirectoryGQL,
    private deleteDirectoryGQL: DeleteDirectoryGQL
  ) {}

  findAll(input: FindDirectoryInput): Observable<Array<Directory>> {
    return this.findAllDirectoriesGQL
      .watch({ data: input })
      .valueChanges.pipe(map((result) => result.data.findAllDirectories)) as Observable<Array<Directory>>;
  }

  find(input: FindDirectoryInput): QueryRef<FindDirectoryQuery, FindDirectoryQueryVariables> {
    return this.findDirectoryGQL.watch({ data: input });
  }

  update(id: string, input: UpdateDirectoryInput): Observable<FetchResult<UpdateDirectoryMutation>> {
    return this.updateDirectoryGQL.mutate({ id, data: input });
  }

  create(input: CreateDirectoryInput): Observable<FetchResult<CreateDirectoryMutation>> {
    return this.createDirectoryGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteDirectoryMutation>> {
    return this.deleteDirectoryGQL.mutate({ id });
  }
}
