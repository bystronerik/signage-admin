import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './pages/listing/listing.page';
import { AssetsRoutingModule } from '@app/assets/assets-routing.module';
import { DetailPage } from '@app/assets/pages/detail/detail.page';
import { EditPage } from '@app/assets/pages/edit/edit.page';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    LayoutModule,
    ModalModule,
    AlertModule,
  ],
})
export class AssetsModule {}
