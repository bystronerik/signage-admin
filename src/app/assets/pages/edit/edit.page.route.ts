import { Route } from '@angular/router';
import { EditPage } from './edit.page';
import { Path } from '@core/enums';

export const CREATE_ROUTE: Route = {
  path: Path.AssetsCreate,
  component: EditPage,
};

export const EDIT_ROUTE: Route = {
  path: Path.AssetsEdit,
  component: EditPage,
};
