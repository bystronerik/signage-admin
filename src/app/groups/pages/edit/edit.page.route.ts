import { Route } from '@angular/router';
import { EditPage } from './edit.page';
import { Path } from '@core/enums';

export const CREATE_ROUTE: Route = {
  path: Path.GroupsCreate,
  component: EditPage,
};

export const EDIT_ROUTE: Route = {
  path: Path.GroupsEdit,
  component: EditPage,
};
