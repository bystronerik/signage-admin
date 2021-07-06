import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from '@app/assetlists/pages/listing/listing.page';
import { DetailPage } from '@app/assetlists/pages/detail/detail.page';
import { EditPage } from '@app/assetlists/pages/edit/edit.page';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { AssetListsRoutingModule } from '@app/assetlists/assetlists-routing.module';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';
import { DatagridModule } from '@ui/datagrid/datagrid.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [
    CommonModule,
    AssetListsRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    LayoutModule,
    ModalModule,
    AlertModule,
    DatagridModule,
  ],
})
export class AssetListsModule {}
