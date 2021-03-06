import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './pages/listing/listing.page';
import { AssetsRoutingModule } from '@app/assets/assets-routing.module';
import { DetailPage } from '@app/assets/pages/detail/detail.page';
import { EditPage } from '@app/assets/pages/edit/edit.page';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';
import { DatagridModule } from '@ui/datagrid/datagrid.module';
import { DirectoryModule } from '@ui/directory/directory.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    FormsModule,
    LayoutModule,
    ModalModule,
    AlertModule,
    DatagridModule,
    DirectoryModule,
  ],
})
export class AssetsModule {}
