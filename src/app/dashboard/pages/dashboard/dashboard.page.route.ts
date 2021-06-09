import { Route } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { Path } from '@core/enums';

export const DASHBOARD_ROUTE: Route = {
  path: '',
  component: DashboardPage,
  data: {
    title: 'Nástěnka',
    description: '',
    robots: 'noindex, nofollow',
  },
};
