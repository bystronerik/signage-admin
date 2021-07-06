import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './pages/listing/listing.page';
import { AlertsRoutingModule } from '@app/alerts/alerts-routing.module';
import { DetailPage } from '@app/alerts/pages/detail/detail.page';
import { EditPage } from '@app/alerts/pages/edit/edit.page';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';
import { DatagridModule } from '@ui/datagrid/datagrid.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    LayoutModule,
    ModalModule,
    AlertModule,
    DatagridModule,
  ],
})
export class AlertsModule {}
