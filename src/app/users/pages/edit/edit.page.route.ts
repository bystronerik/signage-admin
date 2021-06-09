import { Route } from '@angular/router';
import { EditPage } from '@app/users/pages/edit/edit.page';
import { Path } from '@core/enums';

export const CREATE_ROUTE: Route = {
  path: Path.UsersCreate,
  component: EditPage,
};

export const EDIT_ROUTE: Route = {
  path: Path.UsersEdit,
  component: EditPage,
};
