import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StyleService } from '@core/shared/style/style.service';
import { FindStyleInput } from '@core/graphql/style';
import { Style } from '@core/shared/style/style.model';

@Injectable({
  providedIn: 'root',
})
export class StyleDataSource extends LocalDataSource {
  lastRequestCount = 0;

  constructor(protected styleService: StyleService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindStyleInput();

    return new Promise<Style[]>((resolve, reject) => {
      this.styleService
        .findAllStyles(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllStyles);
        });
    });
  }
}
