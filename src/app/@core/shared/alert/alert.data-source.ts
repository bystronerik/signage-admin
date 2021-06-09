import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService } from '@core/shared/alert/alert.service';
import { FindAlertInput } from '@core/graphql/alert';
import { Alert } from '@core/shared/alert/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertDataSource extends LocalDataSource {
  lastRequestCount = 0;

  constructor(protected alertService: AlertService) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    const input = new FindAlertInput();

    return new Promise<Alert[]>((resolve, reject) => {
      this.alertService
        .findAllAlerts(input)
        .result()
        .then((value) => {
          resolve(value.data.findAllAlerts);
        });
    });
  }
}
