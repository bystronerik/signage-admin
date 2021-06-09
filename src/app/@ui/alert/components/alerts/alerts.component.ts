import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppAlert, AppAlertService } from '@core/shared/app-alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertsComponent implements OnInit {
  constructor(private alertService: AppAlertService) {}

  ngOnInit(): void {}

  getAlerts(): AppAlert[] {
    return this.alertService.alerts;
  }

  dismissAlert(id: string): void {
    this.alertService.dismiss(id);
  }
}
