import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '@core/shared/user/user.service';
import { FindUserInput } from '@core/graphql/user';
import { User } from '@core/shared/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataSource extends LocalDataSource {
  lastRequestCount = 0;

  constructor(protected userService: UserService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindUserInput();

    return new Promise<User[]>((resolve, reject) => {
      this.userService
        .findAllUsers(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllUsers);
        });
    });
  }
}
