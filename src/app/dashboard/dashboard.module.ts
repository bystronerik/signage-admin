import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, DashboardRoutingModule, ChartsModule],
})
export class DashboardModule {}
