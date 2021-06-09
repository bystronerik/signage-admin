import { Route } from '@angular/router';
import { ListingPage } from './listing.page';
import { Path } from '@core/enums';

export const LISTING_ROUTE: Route = {
  path: Path.AlertsListing,
  component: ListingPage,
};
