import { Route } from '@angular/router';
import { DetailPage } from './detail.page';
import { Path } from '@core/enums';

export const DETAIL_ROUTE: Route = {
  path: Path.AlertsDetail,
  component: DetailPage,
};
