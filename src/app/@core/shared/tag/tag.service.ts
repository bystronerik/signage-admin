import { Injectable } from '@angular/core';
import { IEntityService } from '@core/interfaces/entity-service.interface';
import {
  FindAllTagsGQL,
  CreateTagGQL,
  CreateTagInput,
  DeleteTagGQL,
  FindTagInput,
  FindTagGQL,
  UpdateTagGQL,
  UpdateTagInput,
  Tag, FindTagQuery, FindTagQueryVariables, UpdateTagMutation, CreateTagMutation, DeleteTagMutation
} from '@app/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class TagService implements IEntityService<Tag, FindTagInput, UpdateTagInput, CreateTagInput> {
  constructor(
    private findAllTagsGQL: FindAllTagsGQL,
    private findTagGQL: FindTagGQL,
    private createTagGQL: CreateTagGQL,
    private updateTagGQL: UpdateTagGQL,
    private deleteTagGQL: DeleteTagGQL
  ) {}

  findAll(input: FindTagInput): Observable<Array<Tag>> {
    return this.findAllTagsGQL.watch({ data: input }).valueChanges.pipe(map((result) => result.data.findAllTags));
  }

  find(input: FindTagInput): QueryRef<FindTagQuery, FindTagQueryVariables> {
    return this.findTagGQL.watch({ data: input });
  }

  update(id: string, input: UpdateTagInput): Observable<FetchResult<UpdateTagMutation>> {
    return this.updateTagGQL.mutate({ id, data: input });
  }

  create(input: CreateTagInput): Observable<FetchResult<CreateTagMutation>> {
    return this.createTagGQL.mutate({ data: input });
  }

  delete(id: string): Observable<FetchResult<DeleteTagMutation>> {
    return this.deleteTagGQL.mutate({ id });
  }
}
