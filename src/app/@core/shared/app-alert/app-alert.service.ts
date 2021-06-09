import { Injectable } from '@angular/core';
import { AppAlert } from '@core/shared/app-alert/app-alert.model';
import { BehaviorSubject } from 'rxjs';
import { RandomGeneratorService } from '@core/services';
import { AppAlertType } from '@core/shared/app-alert/app-alert-type.enum';
import { cloneDeep } from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root',
})
export class AppAlertService {
  private readonly ALERTS_ITEM = '_alerts';
  private alertsSubject = new BehaviorSubject<AppAlert[]>(this._getAlerts());

  constructor(private randomGeneratorService: RandomGeneratorService) {
    if (this.alerts == null) {
      this._saveAlerts([]);
    } else {
      const now = Date.now();

      this.alerts.forEach((item) => {
        if (now - item.createDate > 120000) {
          this.dismiss(item.id);
        }
      });
    }
  }

  get alerts(): AppAlert[] {
    return this.alertsSubject?.value;
  }

  showInfo(title: string, content: string): void {
    this.show(title, content, AppAlertType.INFO);
  }

  showSuccess(title: string, content: string): void {
    this.show(title, content, AppAlertType.SUCCESS);
  }

  showWarning(title: string, content: string): void {
    this.show(title, content, AppAlertType.WARNING);
  }

  showError(title: string, content: string): void {
    this.show(title, content, AppAlertType.ERROR);
  }

  show(title: string, content: string, type: AppAlertType): void {
    const alert = new AppAlert();
    alert.id = this.randomGeneratorService.generateId();
    alert.title = title;
    alert.content = content;
    alert.type = type;
    alert.createDate = Date.now();
    this._saveAlerts(this.alerts.concat(alert));

    setTimeout(() => {
      this.dismiss(alert.id);
    }, 4000);
  }

  dismiss(id: string): void {
    this._saveAlerts(this.alerts.filter((item) => item.id !== id));
  }

  private _getAlerts(): AppAlert[] {
    const alerts = JSON.parse(localStorage.getItem(this.ALERTS_ITEM)) as AppAlert[];
    if (alerts == null) {
      return alerts;
    }

    alerts.forEach((item) => {
      if (typeof item.type === 'string') {
        item.type = AppAlertType.serialize(item.type);
      }
    });
    return alerts;
  }

  private _saveAlerts(alerts: AppAlert[]): void {
    const items = cloneDeep(alerts);
    items.forEach((item) => {
      item.type = item.type.toString();
    });

    localStorage.setItem(this.ALERTS_ITEM, JSON.stringify(items));
    this.alertsSubject.next(alerts);
  }
}
