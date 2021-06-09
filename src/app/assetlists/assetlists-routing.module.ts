import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LISTING_ROUTE } from '@app/assetlists/pages/listing/listing.page.route';
import { DETAIL_ROUTE } from '@app/assetlists/pages/detail/detail.page.route';
import { CREATE_ROUTE, EDIT_ROUTE } from '@app/assetlists/pages/edit/edit.page.route';

const routes: Routes = [LISTING_ROUTE, CREATE_ROUTE, DETAIL_ROUTE, EDIT_ROUTE];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetListsRoutingModule {}
