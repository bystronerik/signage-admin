import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { GroupService } from '@core/shared/group/group.service';
import { FindGroupInput } from '@core/graphql/group';
import { Group } from '@core/shared/group/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupDataSource extends LocalDataSource {
  lastRequestCount = 0;

  constructor(protected groupService: GroupService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindGroupInput();

    return new Promise<Group[]>((resolve, reject) => {
      this.groupService
        .findAllGroups(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllGroups);
        });
    });
  }
}
