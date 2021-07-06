import { Injectable } from '@angular/core';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import { Tag } from '@core/shared/tag';
import {
  AllTagsGQL,
  CreateTagGQL,
  CreateTagInput,
  DeleteTagGQL,
  FindTagInput,
  OneTagGQL,
  UpdateTagGQL,
  UpdateTagInput,
} from '@core/graphql/tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class TagService implements IEntityService<Tag, FindTagInput, UpdateTagInput, CreateTagInput> {
  constructor(
    private allTagsGQL: AllTagsGQL,
    private oneTagGQL: OneTagGQL,
    private createTagGQL: CreateTagGQL,
    private updateTagGQL: UpdateTagGQL,
    private deleteTagGQL: DeleteTagGQL
  ) {}

  findAll(input: FindTagInput): Observable<any> {
    return this.allTagsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllTags));
  }

  find(input: FindTagInput): QueryRef<any, any> {
    return this.oneTagGQL.watch({ data: input });
  }

  update(id: string, input: UpdateTagInput): Observable<FetchResult<any>> {
    return this.updateTagGQL.mutate({ id, data: input });
  }

  create(input: CreateTagInput): Observable<FetchResult<any>> {
    return this.createTagGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<any>> {
    return this.deleteTagGQL.mutate({ id });
  }
}
