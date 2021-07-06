import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CREATE_ROUTE, EDIT_ROUTE } from './pages/edit/edit.page.route';

const routes: Routes = [CREATE_ROUTE, EDIT_ROUTE];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectoryRoutingModule {}
