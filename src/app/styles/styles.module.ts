import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './pages/listing/listing.page';
import { DetailPage } from './pages/detail/detail.page';
import { EditPage } from './pages/edit/edit.page';
import { FormsModule } from '@angular/forms';
import { StylesRoutingModule } from './styles-routing.module';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';
import { DatagridModule } from '@ui/datagrid/datagrid.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [CommonModule, StylesRoutingModule, FormsModule, LayoutModule, ModalModule, AlertModule, DatagridModule],
})
export class StylesModule {}
