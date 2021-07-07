import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from '@app/users/pages/listing/listing.page';
import { UsersRoutingModule } from '@app/users/users-routing.module';
import { DetailPage } from '@app/users/pages/detail/detail.page';
import { EditPage } from '@app/users/pages/edit/edit.page';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';
import { DatagridModule } from '@ui/datagrid/datagrid.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [CommonModule, UsersRoutingModule, FormsModule, LayoutModule, ModalModule, AlertModule, DatagridModule],
})
export class UsersModule {}
