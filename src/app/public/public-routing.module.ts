import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { INTERNAL_SERVER_ERROR_ROUTE } from './pages/internal-server-error/internal-server-error.page.route';
import { NOT_FOUND_ROUTE } from './pages/not-found/not-found.page.route';

const routes: Routes = [INTERNAL_SERVER_ERROR_ROUTE, NOT_FOUND_ROUTE];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
