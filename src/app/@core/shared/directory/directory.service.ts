import { Injectable } from '@angular/core';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { Directory } from '@core/shared/directory';
import {
  AllDirectoriesGQL,
  CreateDirectoryGQL,
  CreateDirectoryInput,
  DeleteDirectoryGQL,
  FindDirectoryInput,
  OneDirectoryGQL,
  UpdateDirectoryGQL,
  UpdateDirectoryInput,
} from '@core/graphql/directory';
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
    private allDirectoriesGQL: AllDirectoriesGQL,
    private oneDirectoryGQL: OneDirectoryGQL,
    private createDirectoryGQL: CreateDirectoryGQL,
    private updateDirectoryGQL: UpdateDirectoryGQL,
    private deleteDirectoryGQL: DeleteDirectoryGQL
  ) {}

  findAll(input: FindDirectoryInput): Observable<any> {
    return this.allDirectoriesGQL
      .watch({ data: input })
      .valueChanges.pipe(map((result) => result.data.findAllDirectories));
  }

  find(input: FindDirectoryInput): QueryRef<any, any> {
    return this.oneDirectoryGQL.watch({ data: input });
  }

  update(id: string, input: UpdateDirectoryInput): Observable<FetchResult<any>> {
    return this.updateDirectoryGQL.mutate({ id, data: input });
  }

  create(input: CreateDirectoryInput): Observable<FetchResult<any>> {
    return this.createDirectoryGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteDirectoryGQL.mutate({ id });
  }
}
