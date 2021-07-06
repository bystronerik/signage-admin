import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from '@app/planner/pages/listing/listing.page';
import { PlannerRoutingModule } from '@app/planner/planner-routing.module';
import { DetailPage } from '@app/planner/pages/detail/detail.page';
import { EditPage } from '@app/planner/pages/edit/edit.page';
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
    PlannerRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    LayoutModule,
    ModalModule,
    AlertModule,
    DatagridModule,
  ],
})
export class PlannerModule {}
