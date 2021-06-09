import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertItemComponent } from './components/alert-item/alert-item.component';
import { AlertsComponent } from './components/alerts/alerts.component';

@NgModule({
  declarations: [AlertItemComponent, AlertsComponent],
  imports: [CommonModule],
  exports: [AlertItemComponent, AlertsComponent],
})
export class AlertModule {}
